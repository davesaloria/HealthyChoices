-- Atomic, authoritative order placement.
--
-- The checkout page previously sent client-computed prices and never
-- touched product stock, which meant (a) a customer could tamper with
-- cart prices in devtools before submitting, and (b) inventory never
-- reflected real sales. This function fixes both by recomputing every
-- price from the current `products` row and decrementing stock inside
-- the same transaction, with a row lock so two simultaneous orders for
-- the last unit of something can't both succeed.

create or replace function place_order(
  p_items jsonb, -- [{"slug": "...", "quantity": 2}, ...]
  p_delivery_type text,
  p_payment_method text,
  p_contact_name text,
  p_contact_phone text,
  p_delivery_address text,
  p_delivery_time text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_item jsonb;
  v_product products%rowtype;
  v_subtotal numeric := 0;
  v_delivery_fee numeric := 0;
  v_tax numeric := 0;
  v_total numeric := 0;
  v_order_id uuid;
begin
  if v_user_id is null then
    raise exception 'Must be signed in to place an order';
  end if;

  if p_items is null or jsonb_array_length(p_items) = 0 then
    raise exception 'Cart is empty';
  end if;

  if p_delivery_type not in ('delivery', 'pickup') then
    raise exception 'Invalid delivery type';
  end if;

  if p_payment_method not in ('gcash', 'cod') then
    raise exception 'Invalid payment method';
  end if;

  -- Pass 1: lock every product row up front and validate stock, so the
  -- whole order either fully succeeds or fully fails (no partial orders).
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    select * into v_product
    from products
    where slug = v_item->>'slug'
    for update;

    if not found then
      raise exception 'Product "%" no longer exists', v_item->>'slug';
    end if;

    if v_product.quantity < (v_item->>'quantity')::integer then
      raise exception 'Not enough stock for %: only % left', v_product.name, v_product.quantity;
    end if;

    v_subtotal := v_subtotal + v_product.price * (v_item->>'quantity')::integer;
  end loop;

  v_tax := round(v_subtotal * 0.12, 2);
  if p_delivery_type = 'delivery' and v_subtotal > 0 and v_subtotal < 500 then
    v_delivery_fee := 49;
  end if;
  v_total := v_subtotal + v_tax + v_delivery_fee;

  insert into orders (
    user_id, subtotal, delivery_fee, total, delivery_type, payment_method,
    contact_name, contact_phone, delivery_address, delivery_time
  ) values (
    v_user_id, v_subtotal, v_delivery_fee, v_total, p_delivery_type, p_payment_method,
    p_contact_name, p_contact_phone, p_delivery_address, p_delivery_time
  ) returning id into v_order_id;

  -- Pass 2: snapshot line items from the authoritative product row and
  -- decrement stock.
  for v_item in select * from jsonb_array_elements(p_items)
  loop
    select * into v_product from products where slug = v_item->>'slug';

    insert into order_items (order_id, product_slug, product_name, image_url, size, unit_price, quantity)
    values (
      v_order_id, v_product.slug, v_product.name, v_product.image_url, v_product.size,
      v_product.price, (v_item->>'quantity')::integer
    );

    update products
    set quantity = quantity - (v_item->>'quantity')::integer, updated_at = now()
    where slug = v_product.slug;
  end loop;

  return v_order_id;
end;
$$;

grant execute on function place_order(jsonb, text, text, text, text, text, text) to authenticated;

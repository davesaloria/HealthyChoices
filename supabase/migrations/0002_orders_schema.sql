-- Healthy Choices orders schema
-- Run this once in the Supabase SQL Editor, after 0001_cms_schema.sql.

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled')),
  subtotal numeric not null,
  delivery_fee numeric not null default 0,
  total numeric not null,
  delivery_type text not null default 'delivery' check (delivery_type in ('delivery', 'pickup')),
  payment_method text not null default 'gcash' check (payment_method in ('gcash', 'cod')),
  contact_name text not null,
  contact_phone text not null,
  delivery_address text,
  delivery_time text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Line items are snapshotted (name/price/image at time of order) rather than
-- foreign-keyed to products, since the public catalog can fall back to static
-- data whose ids don't correspond to real product rows.
create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_slug text not null,
  product_name text not null,
  image_url text,
  size text,
  unit_price numeric not null,
  quantity integer not null,
  created_at timestamptz not null default now()
);

alter table orders enable row level security;
alter table order_items enable row level security;

create policy "Customers can view own orders" on orders for select
  using (auth.uid() = user_id);

create policy "Customers can create own orders" on orders for insert
  with check (auth.uid() = user_id);

create policy "Admins can view all orders" on orders for select
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins can update orders" on orders for update
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()))
  with check (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Customers can view own order items" on order_items for select
  using (exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

create policy "Customers can create own order items" on order_items for insert
  with check (exists (select 1 from orders where orders.id = order_items.order_id and orders.user_id = auth.uid()));

create policy "Admins can view all order items" on order_items for select
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create index if not exists orders_user_id_idx on orders (user_id);
create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists order_items_order_id_idx on order_items (order_id);

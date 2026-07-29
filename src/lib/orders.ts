import { createClient } from '@/lib/supabase/client'
import type { CartItem } from '@/store/cart'

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled'

export interface OrderItemRow {
  id: string
  product_slug: string
  product_name: string
  image_url: string | null
  size: string | null
  unit_price: number
  quantity: number
}

export interface OrderRow {
  id: string
  user_id: string
  status: OrderStatus
  subtotal: number
  delivery_fee: number
  total: number
  delivery_type: 'delivery' | 'pickup'
  payment_method: 'gcash' | 'cod'
  contact_name: string
  contact_phone: string
  delivery_address: string | null
  delivery_time: string | null
  notes: string | null
  created_at: string
  order_items: OrderItemRow[]
}

export interface NewOrderInput {
  items: CartItem[]
  deliveryType: 'delivery' | 'pickup'
  paymentMethod: 'gcash' | 'cod'
  contactName: string
  contactPhone: string
  deliveryAddress?: string
  deliveryTime?: string
}

// Prices, stock checks, and totals are all computed inside place_order()
// from the live `products` rows, not from client-supplied values — the
// client's cart is only used here to say *which* slugs and quantities
// were requested.
export async function createOrder(input: NewOrderInput): Promise<string> {
  const supabase = createClient()

  const { data, error } = await supabase.rpc('place_order', {
    p_items: input.items.map((item) => ({ slug: item.slug, quantity: item.quantity })),
    p_delivery_type: input.deliveryType,
    p_payment_method: input.paymentMethod,
    p_contact_name: input.contactName,
    p_contact_phone: input.contactPhone,
    p_delivery_address: input.deliveryAddress ?? null,
    p_delivery_time: input.deliveryTime ?? null,
  })

  if (error) throw error

  return data as string
}

export async function getOrderById(id: string): Promise<OrderRow | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) return null
  return data as OrderRow
}

export async function getMyOrders(): Promise<OrderRow[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data as OrderRow[]
}

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  preparing: 'Preparing',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
}

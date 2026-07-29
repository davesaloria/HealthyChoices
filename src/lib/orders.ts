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
  userId: string
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  deliveryType: 'delivery' | 'pickup'
  paymentMethod: 'gcash' | 'cod'
  contactName: string
  contactPhone: string
  deliveryAddress?: string
  deliveryTime?: string
  notes?: string
}

export async function createOrder(input: NewOrderInput) {
  const supabase = createClient()

  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: input.userId,
      subtotal: input.subtotal,
      delivery_fee: input.deliveryFee,
      total: input.total,
      delivery_type: input.deliveryType,
      payment_method: input.paymentMethod,
      contact_name: input.contactName,
      contact_phone: input.contactPhone,
      delivery_address: input.deliveryAddress ?? null,
      delivery_time: input.deliveryTime ?? null,
      notes: input.notes ?? null,
    })
    .select()
    .single()

  if (error) throw error

  const { error: itemsError } = await supabase.from('order_items').insert(
    input.items.map((item) => ({
      order_id: order.id,
      product_slug: item.slug,
      product_name: item.name,
      image_url: item.image_url,
      size: item.size,
      unit_price: item.price,
      quantity: item.quantity,
    }))
  )

  if (itemsError) throw itemsError

  return order.id as string
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

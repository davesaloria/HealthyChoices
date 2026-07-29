import { createClient } from '@/lib/supabase/server'
import { orderStatusLabels, type OrderRow } from '@/lib/orders'
import { OrderStatusSelect } from './OrderStatusSelect'

const statusStyles: Record<string, string> = {
  pending: 'bg-charcoal-100 text-charcoal-700',
  confirmed: 'bg-sage-100 text-sage-800',
  preparing: 'bg-sage-100 text-sage-800',
  out_for_delivery: 'bg-primary-100 text-primary-700',
  delivered: 'bg-primary-500 text-white',
  cancelled: 'bg-coral-100 text-coral-700',
}

export default async function AdminOrdersPage() {
  const supabase = await createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select('*, order_items(*)')
    .order('created_at', { ascending: false })

  const rows = (orders ?? []) as OrderRow[]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-charcoal-900">Orders</h1>
        <p className="text-charcoal-600 mt-1">{rows.length} orders</p>
      </div>

      <div className="space-y-4">
        {rows.map((order) => (
          <div key={order.id} className="bg-white rounded-2xl border border-charcoal-100 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-semibold text-charcoal-900">
                  Order #{order.id.slice(0, 8)}
                  <span
                    className={`ml-3 px-2 py-1 rounded-full text-xs font-semibold ${statusStyles[order.status]}`}
                  >
                    {orderStatusLabels[order.status]}
                  </span>
                </p>
                <p className="text-sm text-charcoal-500">
                  {new Date(order.created_at).toLocaleString('en-PH')}
                </p>
              </div>
              <OrderStatusSelect orderId={order.id} status={order.status} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4 text-sm">
              <div>
                <p className="font-semibold text-charcoal-900 mb-1">Customer</p>
                <p className="text-charcoal-600">{order.contact_name}</p>
                <p className="text-charcoal-600">{order.contact_phone}</p>
              </div>
              <div>
                <p className="font-semibold text-charcoal-900 mb-1">
                  {order.delivery_type === 'pickup' ? 'Pickup' : 'Delivery'}
                </p>
                {order.delivery_address && (
                  <p className="text-charcoal-600">{order.delivery_address}</p>
                )}
                {order.delivery_time && (
                  <p className="text-charcoal-600">Time slot: {order.delivery_time}</p>
                )}
                <p className="text-charcoal-600 capitalize">Payment: {order.payment_method}</p>
              </div>
            </div>

            <div className="border-t border-charcoal-100 pt-4">
              <ul className="text-sm text-charcoal-600 space-y-1 mb-3">
                {order.order_items.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>
                      {item.product_name} {item.size ? `(${item.size})` : ''} × {item.quantity}
                    </span>
                    <span>₱{item.unit_price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end">
                <p className="font-bold text-charcoal-900">Total: ₱{Math.round(order.total)}</p>
              </div>
            </div>
          </div>
        ))}

        {rows.length === 0 && (
          <p className="p-8 text-center text-charcoal-500 bg-white rounded-2xl border border-charcoal-100">
            No orders yet.
          </p>
        )}
      </div>
    </div>
  )
}

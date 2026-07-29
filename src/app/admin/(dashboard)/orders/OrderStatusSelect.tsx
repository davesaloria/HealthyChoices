'use client'

import { useRef } from 'react'
import { updateOrderStatus } from './actions'
import { orderStatusLabels, type OrderStatus } from '@/lib/orders'

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form ref={formRef} action={updateOrderStatus.bind(null, orderId)}>
      <select
        name="status"
        defaultValue={status}
        onChange={() => formRef.current?.requestSubmit()}
        className="px-2 py-1.5 rounded-lg border border-charcoal-200 text-sm font-medium text-charcoal-900"
      >
        {Object.entries(orderStatusLabels).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </form>
  )
}

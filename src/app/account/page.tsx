'use client'

import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { getMyOrders, orderStatusLabels, type OrderRow } from '@/lib/orders'
import type { User } from '@supabase/supabase-js'

export default function AccountPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const justOrderedId = searchParams.get('order')

  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push('/login?redirect=/account')
        return
      }
      setUser(data.user)
      const myOrders = await getMyOrders()
      setOrders(myOrders)
      setLoading(false)
    })
  }, [router])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  if (loading || !user) {
    return <main className="py-24 text-center text-charcoal-500">Loading account...</main>
  }

  const displayName = (user.user_metadata?.full_name as string) || user.email || 'there'

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-8">
          My Account
        </h1>

        {justOrderedId && (
          <div className="mb-8 px-6 py-4 rounded-xl bg-primary-50 border border-primary-200 text-primary-800">
            Thank you! Your order has been placed and is now pending confirmation.
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <h2 className="font-bold text-charcoal-900">{displayName}</h2>
                  <p className="text-sm text-charcoal-600">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <Link href="/shop" className="block w-full text-left px-4 py-2 rounded-lg hover:bg-sage-50 font-medium text-charcoal-900">
                    Continue Shopping
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-coral-50 font-medium text-coral-600"
                  >
                    Sign Out
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-bold text-charcoal-900 mb-6">My Orders</h2>

                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-charcoal-600 mb-4">You haven&apos;t placed any orders yet.</p>
                    <Link href="/shop">
                      <Button>Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className={`p-4 border rounded-lg ${
                          order.id === justOrderedId
                            ? 'border-primary-300 bg-primary-50'
                            : 'border-charcoal-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <p className="font-semibold text-charcoal-900">
                              Order #{order.id.slice(0, 8)}
                            </p>
                            <p className="text-sm text-charcoal-600">
                              {new Date(order.created_at).toLocaleDateString('en-PH', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-charcoal-900">₱{Math.round(order.total)}</p>
                            <span
                              className={`text-sm font-medium ${
                                order.status === 'delivered'
                                  ? 'text-primary-500'
                                  : order.status === 'cancelled'
                                    ? 'text-charcoal-400'
                                    : 'text-coral-500'
                              }`}
                            >
                              {orderStatusLabels[order.status]}
                            </span>
                          </div>
                        </div>
                        <ul className="text-sm text-charcoal-600 space-y-1">
                          {order.order_items.map((item) => (
                            <li key={item.id} className="flex justify-between">
                              <span>
                                {item.product_name} {item.size ? `(${item.size})` : ''} × {item.quantity}
                              </span>
                              <span>₱{item.unit_price * item.quantity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

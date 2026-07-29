'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AccountPage() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
  }

  const orders = [
    {
      id: '001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 3025,
    },
    {
      id: '002',
      date: '2024-01-10',
      status: 'Shipped',
      total: 1500,
    },
  ]

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-8">
          My Account
        </h1>

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
                    {user.name.charAt(0)}
                  </div>
                  <h2 className="font-bold text-charcoal-900">{user.name}</h2>
                  <p className="text-sm text-charcoal-600">{user.email}</p>
                </div>

                <div className="space-y-2">
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-sage-50 font-medium text-charcoal-900">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-sage-50 font-medium text-charcoal-900">
                    Addresses
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-sage-50 font-medium text-charcoal-900">
                    Saved Items
                  </button>
                  <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-coral-50 font-medium text-coral-600">
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
                <h2 className="text-2xl font-bold text-charcoal-900 mb-6">Recent Orders</h2>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-charcoal-100 rounded-lg hover:bg-charcoal-50 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-charcoal-900">
                          Order #{order.id}
                        </p>
                        <p className="text-sm text-charcoal-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-charcoal-900">₱{order.total}</p>
                        <span
                          className={`text-sm font-medium ${
                            order.status === 'Delivered'
                              ? 'text-primary-500'
                              : 'text-coral-500'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

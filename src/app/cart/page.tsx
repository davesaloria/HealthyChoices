'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CartPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Classic Greek Yogurt',
      price: 250,
      quantity: 2,
      size: '500ml',
      image: '🥣',
    },
    {
      id: 2,
      name: 'Mixed Berry Slushie',
      price: 320,
      quantity: 1,
      size: '1L',
      image: '🫐',
    },
  ])

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  const handleRemove = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      setItems(
        items.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      )
    }
  }

  if (items.length === 0) {
    return (
      <main className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="text-7xl mb-6">🛒</div>
          <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-lg text-charcoal-600 mb-8">
            Add some delicious products to get started!
          </p>
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-12">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="space-y-4">
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card>
                    <CardContent className="flex items-center gap-6 pt-6">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gradient-to-br from-sage-100 to-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-4xl">{item.image}</span>
                      </div>

                      {/* Details */}
                      <div className="flex-grow">
                        <h3 className="font-bold text-charcoal-900">{item.name}</h3>
                        <p className="text-sm text-charcoal-600">{item.size}</p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 border border-charcoal-200 rounded-lg p-1">
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 hover:bg-charcoal-50 flex items-center justify-center"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 hover:bg-charcoal-50 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-charcoal-900">
                          ₹{item.price * item.quantity}
                        </p>
                        <p className="text-xs text-charcoal-600">
                          ₹{item.price} each
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => handleRemove(item.id)}
                        className="text-coral-500 hover:text-coral-600 font-semibold"
                      >
                        ✕
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h2 className="font-bold text-charcoal-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-charcoal-100">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Tax (18%)</span>
                    <span>₹{Math.round(tax)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Delivery (Free)</span>
                    <span className="text-primary-500">Free</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6 pb-6 border-b border-charcoal-100">
                  <span className="font-bold text-charcoal-900">Total</span>
                  <span className="text-2xl font-bold text-primary-500">
                    ₹{Math.round(total)}
                  </span>
                </div>

                <Link href="/checkout" className="block">
                  <Button size="lg" className="w-full mb-3">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/shop" className="block">
                  <Button variant="outline" size="lg" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

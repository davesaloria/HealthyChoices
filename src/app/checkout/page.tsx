'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import useCartStore from '@/store/cart'
import { createOrder } from '@/lib/orders'
import type { User } from '@supabase/supabase-js'

const DELIVERY_FEE_THRESHOLD = 500

export default function CheckoutPage() {
  const router = useRouter()
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)

  const [checkingAuth, setCheckingAuth] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    contactName: '',
    contactPhone: '',
    address: '',
    city: '',
    zipcode: '',
    deliveryType: 'delivery',
    deliveryTime: '',
    paymentMethod: 'gcash',
  })

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login?redirect=/checkout')
        return
      }
      setUser(data.user)
      setFormData((prev) => ({
        ...prev,
        contactName: (data.user!.user_metadata?.full_name as string) || '',
      }))
      setCheckingAuth(false)
    })
  }, [router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.12
  const deliveryFee =
    formData.deliveryType === 'delivery' && subtotal < DELIVERY_FEE_THRESHOLD && subtotal > 0 ? 49 : 0
  const total = subtotal + tax + deliveryFee

  const handlePlaceOrder = async () => {
    if (!user) return
    setSubmitting(true)
    setError(null)
    try {
      const orderId = await createOrder({
        userId: user.id,
        items,
        subtotal,
        deliveryFee,
        total,
        deliveryType: formData.deliveryType as 'delivery' | 'pickup',
        paymentMethod: formData.paymentMethod as 'gcash' | 'cod',
        contactName: formData.contactName,
        contactPhone: formData.contactPhone,
        deliveryAddress:
          formData.deliveryType === 'delivery'
            ? `${formData.address}, ${formData.city} ${formData.zipcode}`.trim()
            : undefined,
        deliveryTime: formData.deliveryTime || undefined,
      })
      clearCart()
      router.push(`/account?order=${orderId}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong placing your order.')
      setSubmitting(false)
    }
  }

  if (checkingAuth) {
    return <main className="py-24 text-center text-charcoal-500">Loading checkout...</main>
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
            Add some products before checking out.
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
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            {/* Steps */}
            <div className="flex items-center justify-between mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      step >= s ? 'bg-primary-500' : 'bg-charcoal-200'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        step > s ? 'bg-primary-500' : 'bg-charcoal-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Contact & Delivery */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="contactName"
                        placeholder="Full name"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      />
                      <input
                        type="tel"
                        name="contactPhone"
                        placeholder="Phone number"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                      Delivery Method
                    </h2>
                    <div className="space-y-3">
                      {['delivery', 'pickup'].map((method) => (
                        <label key={method} className="flex items-center p-4 border border-charcoal-200 rounded-lg cursor-pointer hover:bg-charcoal-50">
                          <input
                            type="radio"
                            name="deliveryType"
                            value={method}
                            checked={formData.deliveryType === method}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary-500"
                          />
                          <span className="ml-3 font-medium text-charcoal-900 capitalize">
                            {method === 'pickup' ? 'Pickup (Casa Mira South, Langtad, Naga)' : method}
                          </span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Button
                  onClick={() => setStep(2)}
                  size="lg"
                  className="w-full mt-8"
                  disabled={!formData.contactName || !formData.contactPhone}
                >
                  Continue to Delivery
                </Button>
              </motion.div>
            )}

            {/* Step 2: Delivery Address / Time */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                {formData.deliveryType === 'delivery' && (
                  <Card className="mb-8">
                    <CardContent className="pt-6">
                      <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                        Delivery Address
                      </h2>
                      <div className="space-y-4">
                        <input
                          type="text"
                          name="address"
                          placeholder="Street address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                          />
                          <input
                            type="text"
                            name="zipcode"
                            placeholder="Postal code"
                            value={formData.zipcode}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                      {formData.deliveryType === 'pickup' ? 'Pickup Time' : 'Delivery Time'}
                    </h2>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <option value="">Select time slot</option>
                      <option value="7-9">7:00 AM - 9:00 AM</option>
                      <option value="9-11">9:00 AM - 11:00 AM</option>
                    </select>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(1)}
                    size="lg"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    size="lg"
                    className="flex-1"
                    disabled={
                      !formData.deliveryTime ||
                      (formData.deliveryType === 'delivery' && (!formData.address || !formData.city))
                    }
                  >
                    Continue to Payment
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                      Payment Method
                    </h2>
                    <div className="space-y-3">
                      {['gcash', 'cod'].map((method) => (
                        <label key={method} className="flex items-center p-4 border border-primary-200 rounded-lg cursor-pointer hover:bg-primary-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value={method}
                            checked={formData.paymentMethod === method}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-primary-500"
                          />
                          <span className="ml-3 font-medium text-charcoal-900 capitalize">
                            {method === 'gcash' && 'GCash'}
                            {method === 'cod' && 'Cash on Delivery / Pickup'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-8 bg-primary-50 border-primary-200">
                  <CardContent className="pt-6">
                    <p className="text-charcoal-600">
                      {formData.paymentMethod === 'gcash'
                        ? "We'll send our GCash number to confirm payment once your order is placed."
                        : "Pay in cash when your order arrives or when you pick it up."}
                    </p>
                  </CardContent>
                </Card>

                {error && (
                  <div className="mb-6 px-4 py-3 rounded-lg bg-coral-50 text-coral-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    size="lg"
                    className="flex-1"
                    disabled={submitting}
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                  >
                    {submitting ? 'Placing Order...' : 'Complete Order'}
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="sticky top-24">
              <CardContent className="pt-6">
                <h2 className="font-bold text-charcoal-900 mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6 border-b border-charcoal-100">
                  {items.map((item) => (
                    <div key={item.slug} className="flex justify-between">
                      <span className="text-charcoal-600">
                        {item.name} ({item.quantity}x)
                      </span>
                      <span className="font-semibold">₱{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-charcoal-100">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Subtotal</span>
                    <span>₱{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>VAT (12%)</span>
                    <span>₱{Math.round(tax)}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Delivery</span>
                    <span className={deliveryFee === 0 ? 'text-primary-500' : ''}>
                      {deliveryFee === 0 ? 'Free' : `₱${deliveryFee}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="font-bold text-charcoal-900">Total</span>
                  <span className="text-2xl font-bold text-primary-500">₱{Math.round(total)}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

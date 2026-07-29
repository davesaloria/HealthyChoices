'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
    zipcode: '',
    deliveryType: 'delivery',
    deliveryTime: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const total = 918

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
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        />
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                        />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={formData.phone}
                        onChange={handleInputChange}
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
                            {method}
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
                >
                  Continue to Delivery
                </Button>
              </motion.div>
            )}

            {/* Step 2: Delivery Address */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
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
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="city"
                          placeholder="City"
                          value={formData.city}
                          onChange={handleInputChange}
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

                <Card className="mb-8">
                  <CardContent className="pt-6">
                    <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                      Delivery Time
                    </h2>
                    <select
                      name="deliveryTime"
                      value={formData.deliveryTime}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    >
                      <option value="">Select time slot</option>
                      <option value="9-11">9:00 AM - 11:00 AM</option>
                      <option value="11-1">11:00 AM - 1:00 PM</option>
                      <option value="3-5">3:00 PM - 5:00 PM</option>
                      <option value="5-7">5:00 PM - 7:00 PM</option>
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
                      {['gcash', 'card', 'cod'].map((method) => (
                        <label key={method} className="flex items-center p-4 border border-primary-200 rounded-lg cursor-pointer hover:bg-primary-50">
                          <input
                            type="radio"
                            defaultChecked={method === 'gcash'}
                            className="w-4 h-4 text-primary-500"
                          />
                          <span className="ml-3 font-medium text-charcoal-900 capitalize">
                            {method === 'card' && 'Credit/Debit Card'}
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
                    <p className="text-charcoal-600 mb-4">
                      ✓ Secure payment processing
                    </p>
                    <p className="text-charcoal-600">
                      ✓ Your payment information is encrypted and safe
                    </p>
                  </CardContent>
                </Card>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep(2)}
                    size="lg"
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    className="flex-1"
                  >
                    Complete Order
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
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Classic Greek Yogurt (2x)</span>
                    <span className="font-semibold">₱500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-600">Mixed Berry Slushie (1x)</span>
                    <span className="font-semibold">₱320</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 pb-6 border-b border-charcoal-100">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Subtotal</span>
                    <span>₱820</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>VAT (12%)</span>
                    <span>₱98</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Delivery</span>
                    <span className="text-primary-500">Free</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="font-bold text-charcoal-900">Total</span>
                  <span className="text-2xl font-bold text-primary-500">₱{total}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

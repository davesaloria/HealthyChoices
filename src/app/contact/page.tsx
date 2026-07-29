'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || null,
      message: formData.message,
    })

    if (error) {
      setError(error.message)
      setStatus('error')
      return
    }

    setStatus('sent')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-16 border-b border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Have questions? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-charcoal-900 mb-6">
                    Send us a message
                  </h2>

                  {status === 'sent' ? (
                    <div className="px-4 py-6 rounded-lg bg-primary-50 text-primary-700 text-center">
                      <p className="font-semibold mb-1">Message sent!</p>
                      <p className="text-sm">We&apos;ll get back to you soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {status === 'error' && (
                        <div className="px-4 py-3 rounded-lg bg-coral-50 text-coral-700 text-sm">
                          {error ?? 'Something went wrong. Please try again.'}
                        </div>
                      )}
                      <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                      />
                      <textarea
                        name="message"
                        placeholder="Your message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
                      />
                      <Button size="lg" className="w-full" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : 'Send Message'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8"
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">📍</div>
                  <h3 className="font-bold text-charcoal-900 mb-2">Address</h3>
                  <p className="text-charcoal-600">
                    Block 8 Lot 31 Phase 2A<br />
                    Casa Mira South, Langtad<br />
                    City of Naga, 6037 Cebu
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="font-bold text-charcoal-900 mb-2">Phone</h3>
                  <a
                    href="tel:+639687374820"
                    className="text-primary-500 hover:text-primary-600"
                  >
                    0968 737 4820
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">✉️</div>
                  <h3 className="font-bold text-charcoal-900 mb-2">Email</h3>
                  <a
                    href="mailto:hello@healthychoices.com"
                    className="text-primary-500 hover:text-primary-600"
                  >
                    hello@healthychoices.com
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">🕒</div>
                  <h3 className="font-bold text-charcoal-900 mb-2">Hours</h3>
                  <p className="text-charcoal-600">
                    Open daily<br />
                    7:00 AM – 11:00 AM
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

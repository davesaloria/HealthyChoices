'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function ContactPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-16 border-b border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Get In Touch
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you.
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
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                    <input
                      type="text"
                      placeholder="Subject"
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                    <textarea
                      placeholder="Your message"
                      rows={6}
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
                    />
                    <Button size="lg" className="w-full">
                      Send Message
                    </Button>
                  </form>
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
                    Naga, Nagaland<br />
                    India
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">📞</div>
                  <h3 className="font-bold text-charcoal-900 mb-2">Phone</h3>
                  <a
                    href="tel:+919876543210"
                    className="text-primary-500 hover:text-primary-600"
                  >
                    +91 9876 543 210
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
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 10:00 AM - 4:00 PM<br />
                    Sun: Closed
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

'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function SignupPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sage-50 to-cream-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">
                    Join Us
                  </h1>
                  <p className="text-charcoal-600">
                    Create your Healthy Choices account
                  </p>
                </div>

                <form className="space-y-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full name"
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                  />
                  <Button size="lg" className="w-full">
                    Sign Up
                  </Button>
                </form>

                <div className="text-center text-sm text-charcoal-600">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-primary-500 hover:text-primary-600 font-semibold"
                  >
                    Sign in
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

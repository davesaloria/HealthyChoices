'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      setError(error.message)
      setStatus('error')
      return
    }

    setStatus('sent')
  }

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
                    Reset Password
                  </h1>
                  <p className="text-charcoal-600">
                    We&apos;ll email you a link to reset your password.
                  </p>
                </div>

                {status === 'sent' ? (
                  <div className="px-4 py-6 rounded-lg bg-primary-50 text-primary-700 text-center text-sm">
                    Check your email for a password reset link.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    {error && (
                      <div className="px-4 py-3 rounded-lg bg-coral-50 text-coral-700 text-sm">
                        {error}
                      </div>
                    )}
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                    <Button size="lg" className="w-full" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                  </form>
                )}

                <div className="text-center text-sm text-charcoal-600">
                  <Link href="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
                    Back to Sign In
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

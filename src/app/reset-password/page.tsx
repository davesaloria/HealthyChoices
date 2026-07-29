'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [invalidLink, setInvalidLink] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    // Clicking the emailed reset link redirects here with a recovery
    // token in the URL; the SDK exchanges it for a session automatically
    // and fires this event once that's done.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setReady(true)
      }
    })

    // If a session already exists (e.g. the event already fired before
    // this listener attached), don't leave the user stuck.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true)
    })

    const timeout = setTimeout(() => {
      setReady((current) => {
        if (!current) setInvalidLink(true)
        return current
      })
    }, 4000)

    return () => {
      subscription.unsubscribe()
      clearTimeout(timeout)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setSubmitting(true)
    const supabase = createClient()
    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError(error.message)
      setSubmitting(false)
      return
    }

    setDone(true)
    setTimeout(() => router.push('/account'), 1500)
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
                    Set a New Password
                  </h1>
                </div>

                {invalidLink && !ready && (
                  <div className="px-4 py-3 rounded-lg bg-coral-50 text-coral-700 text-sm text-center">
                    This reset link is invalid or has expired. Request a new one from the sign-in page.
                  </div>
                )}

                {done && (
                  <div className="px-4 py-3 rounded-lg bg-primary-50 text-primary-700 text-sm text-center">
                    Password updated! Redirecting...
                  </div>
                )}

                {ready && !done && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="px-4 py-3 rounded-lg bg-coral-50 text-coral-700 text-sm">
                        {error}
                      </div>
                    )}
                    <input
                      type="password"
                      placeholder="New password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                    />
                    <Button size="lg" className="w-full" disabled={submitting}>
                      {submitting ? 'Updating...' : 'Update Password'}
                    </Button>
                  </form>
                )}

                {!ready && !invalidLink && (
                  <p className="text-center text-charcoal-500 text-sm">Verifying reset link...</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

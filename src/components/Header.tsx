'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import useCartStore from '@/store/cart'
import { createClient } from '@/lib/supabase/client'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [mounted, setMounted] = useState(false)
  const count = useCartStore((state) => state.getCount())

  // Cart (localStorage) and auth state are only known client-side, so the
  // server-rendered shell must stay static until after hydration to avoid
  // a text-content mismatch.
  useEffect(() => {
    setMounted(true)
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setIsLoggedIn(!!data.user))
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b border-charcoal-100 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.jpg"
            alt="Healthy Choices"
            width={36}
            height={36}
            className="rounded-full object-cover"
            priority
          />
          <span className="font-display font-bold text-xl text-charcoal-900 hidden sm:inline">
            Healthy Choices
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="/shop"
            className="text-charcoal-700 hover:text-primary-500 transition-colors"
          >
            Shop
          </Link>
          <Link
            href="/recipes"
            className="text-charcoal-700 hover:text-primary-500 transition-colors"
          >
            Recipes
          </Link>
          <Link
            href="/about"
            className="text-charcoal-700 hover:text-primary-500 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-charcoal-700 hover:text-primary-500 transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="sm">
              Cart
            </Button>
            {mounted && count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-coral-500 text-white text-xs font-bold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <Link href={mounted && isLoggedIn ? '/account' : '/login'} className="hidden sm:block">
            <Button variant="outline" size="sm">
              {mounted && isLoggedIn ? 'Account' : 'Sign In'}
            </Button>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-charcoal-900"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-charcoal-100 p-4 space-y-2">
          <Link
            href="/shop"
            className="block px-4 py-2 text-charcoal-700 hover:bg-sage-50 rounded-lg"
          >
            Shop
          </Link>
          <Link
            href="/recipes"
            className="block px-4 py-2 text-charcoal-700 hover:bg-sage-50 rounded-lg"
          >
            Recipes
          </Link>
          <Link
            href="/about"
            className="block px-4 py-2 text-charcoal-700 hover:bg-sage-50 rounded-lg"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block px-4 py-2 text-charcoal-700 hover:bg-sage-50 rounded-lg"
          >
            Contact
          </Link>
          <Link
            href={mounted && isLoggedIn ? '/account' : '/login'}
            className="block px-4 py-2 text-charcoal-700 hover:bg-sage-50 rounded-lg sm:hidden"
          >
            {mounted && isLoggedIn ? 'Account' : 'Sign In'}
          </Link>
        </div>
      )}
    </header>
  )
}

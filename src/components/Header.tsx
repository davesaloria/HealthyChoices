'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
          <Link href="/cart">
            <Button variant="ghost" size="sm">
              Cart
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="outline" size="sm">
              Account
            </Button>
          </Link>
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
        </div>
      )}
    </header>
  )
}

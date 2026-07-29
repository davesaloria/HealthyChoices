'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-white to-sage-50 pt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-display font-bold text-charcoal-900 mb-6 leading-tight">
              Healthy Eating,
              <span className="text-primary-500"> Made Simple</span>
            </h1>
            <p className="text-lg text-charcoal-600 mb-8 leading-relaxed max-w-lg">
              Premium Greek yogurt crafted with love. Fresh ingredients, exceptional quality, and
              wellness you can taste in every spoonful.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/shop">
                <Button size="lg" className="w-full sm:w-auto">
                  Shop Now
                </Button>
              </Link>
              <Link href="/recipes">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Hero Image Collage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[420px] sm:h-[460px] mb-10 sm:mb-0"
          >
            {/* Main photo */}
            <div className="absolute inset-0 right-8 rounded-3xl overflow-hidden shadow-medium">
              <Image
                src="/images/hero-main-bowl.jpg"
                alt="Healthy Choices Greek yogurt bowl loaded with nuts, seeds, and dried fruit, with CULTUR'D tubs stocked in the fridge behind it"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Accent photo: top right */}
            <div className="absolute -top-2 right-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-medium rotate-6 z-10">
              <Image
                src="/images/hero-accent-fruit.jpg"
                alt="Yogurt bowl with fresh fruit toppings"
                fill
                sizes="112px"
                className="object-cover"
              />
            </div>

            {/* Accent photo: right, lower */}
            <div className="absolute bottom-14 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-medium -rotate-6 z-10">
              <Image
                src="/images/hero-accent-mango.jpg"
                alt="Mango Greek yogurt"
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>

            {/* Floating trust badge */}
            <div className="absolute -bottom-6 left-0 sm:-left-6 bg-white rounded-2xl shadow-medium px-4 py-3 flex items-center gap-3 z-10">
              <span className="text-2xl">⭐</span>
              <div>
                <p className="font-bold text-charcoal-900 leading-none text-sm">
                  4.9/5 rating
                </p>
                <p className="text-xs text-charcoal-600 mt-1">280+ happy customers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

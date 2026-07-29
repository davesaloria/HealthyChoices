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

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full h-96 rounded-3xl overflow-hidden shadow-medium">
              <Image
                src="/images/hero-yogurt-bowl.jpg"
                alt="Healthy Choices Greek yogurt bowl with banana, walnuts, and pumpkin seeds"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

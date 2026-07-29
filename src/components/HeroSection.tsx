'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import Image from 'next/image'

const gallery = [
  {
    src: '/images/hero-main-bowl.jpg',
    alt: "Healthy Choices Greek yogurt bowl loaded with nuts, seeds, and dried fruit, with CULTUR'D tubs stocked in the fridge behind it",
  },
  {
    src: '/images/hero-accent-fruit.jpg',
    alt: 'Yogurt bowl with fresh fruit toppings',
  },
  {
    src: '/images/hero-accent-mango.jpg',
    alt: 'Mango Greek yogurt',
  },
]

export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const active = gallery[activeIndex]
  const thumbnails = gallery
    .map((photo, idx) => ({ ...photo, idx }))
    .filter((photo) => photo.idx !== activeIndex)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % gallery.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [isPaused])

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

          {/* Hero Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[420px] sm:h-[460px] mb-10 sm:mb-0"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main photo */}
            <div className="absolute inset-0 right-8 rounded-3xl overflow-hidden shadow-medium">
              <AnimatePresence>
                <motion.div
                  key={active.src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.src}
                    alt={active.alt}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnail: top right */}
            <button
              type="button"
              onClick={() => setActiveIndex(thumbnails[0].idx)}
              aria-label="View this photo"
              className="group absolute -top-2 right-0 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-medium rotate-6 z-10 cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-0 focus-visible:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <Image
                src={thumbnails[0].src}
                alt={thumbnails[0].alt}
                fill
                sizes="112px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </button>

            {/* Thumbnail: right, lower */}
            <button
              type="button"
              onClick={() => setActiveIndex(thumbnails[1].idx)}
              aria-label="View this photo"
              className="group absolute bottom-14 right-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-medium -rotate-6 z-10 cursor-pointer transition-transform duration-300 hover:scale-125 hover:rotate-0 focus-visible:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <Image
                src={thumbnails[1].src}
                alt={thumbnails[1].alt}
                fill
                sizes="96px"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Counter } from '@/components/Counter'

const stats = [
  { value: 843, suffix: '+', label: "CULTUR'D tubs sold" },
  { value: 235, suffix: '+', label: 'Overnight oat jars sold' },
  { value: 281, suffix: '+', label: 'Happy customers' },
  { value: 24, suffix: '', label: 'Pantry products stocked' },
  { value: 4, suffix: '', label: 'Real fruit flavors' },
  { value: 5.0, suffix: '★', label: 'Google rating', decimals: 1 },
]

export function OurJourney() {
  return (
    <section className="relative py-20 md:py-28 bg-charcoal-900 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-coral-500/20 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Copy + Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-300 text-sm font-semibold mb-6">
              Our Journey So Far
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              This isn&apos;t just yogurt.
              <br />
              It&apos;s <span className="text-primary-400">your journey</span> to
              feeling better.
            </h2>
            <p className="text-lg text-charcoal-300 mb-10 leading-relaxed max-w-lg">
              From one homemade batch to a full pantry of wellness essentials —
              every tub is handmade, every jar is packed with love, and every
              delivery (even the late-night ones) is us showing up for your
              health. Thank you for growing with us.
            </p>

            <div className="grid grid-cols-3 gap-x-6 gap-y-8 mb-10">
              {stats.map((stat, idx) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  viewport={{ once: true }}
                >
                  <p className="text-3xl md:text-4xl font-display font-bold text-white">
                    <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="text-sm text-charcoal-400 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-charcoal-300 mb-10 pb-10 border-b border-white/10">
              <span className="inline-flex items-center gap-1.5">
                📍 Casa Mira South, Langtad, City of Naga, Cebu
              </span>
              <span className="inline-flex items-center gap-1.5">🕒 Open daily, 7:00 AM – 11:00 AM</span>
              <span className="inline-flex items-center gap-1.5">🚚 Local delivery across Naga</span>
            </div>

            <Link href="/about">
              <Button size="lg" className="bg-white text-charcoal-900 hover:bg-cream-100">
                Read Our Full Story
              </Button>
            </Link>
          </motion.div>

          {/* Photo collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative h-[440px] hidden sm:block"
          >
            <div className="absolute top-0 left-4 w-[62%] rotate-[-4deg] shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
              <Image
                src="/images/product-bundle-pack.jpg"
                alt="Healthy Choices delivery bag with CULTUR'D Greek yogurt tubs"
                width={500}
                height={667}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-[52%] rotate-[5deg] shadow-2xl rounded-2xl overflow-hidden border-4 border-white">
              <Image
                src="/images/story-ready-for-delivery.jpg"
                alt="Overnight oat jars ready for late-night delivery"
                width={420}
                height={560}
                className="w-full h-auto"
              />
              <p className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold drop-shadow-lg">
                Fresh jars, delivered after dark 🌙
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

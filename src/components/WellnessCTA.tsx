'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

const highlights = [
  { icon: '/images/icon-premium-quality.png', label: 'Premium\nIngredients' },
  { icon: '/images/icon-high-protein.png', label: 'High\nProtein' },
  { icon: '/images/icon-probiotics.png', label: 'Probiotics\nfor Gut Health' },
  { icon: '/images/icon-fresh-daily.png', label: 'Fresh\nMade Daily' },
]

export function WellnessCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <Image
        src="/images/hero-yogurt-bowl.jpg"
        alt="Healthy Choices Greek yogurt bowl with fresh berries"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/70 to-charcoal-900/20" />

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-xl"
        >
          <span className="text-primary-400 text-2xl">🌿</span>
          <div className="w-10 h-0.5 bg-primary-400 my-3" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            Start Your Wellness Journey
          </h2>
          <p className="text-lg text-charcoal-200 mb-8 max-w-md leading-relaxed">
            Join thousands of customers who&apos;ve made Healthy Choices part of
            their daily routine.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              className="bg-white text-charcoal-900 hover:bg-cream-100 inline-flex items-center gap-2"
            >
              Shop Now
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap md:flex-nowrap items-start gap-6 md:gap-8 mt-12 pt-8 border-t border-white/20 max-w-3xl"
        >
          {highlights.map((item, idx) => (
            <div key={item.label} className="flex items-center gap-3 flex-shrink-0">
              {idx > 0 && (
                <span className="hidden md:block w-px h-10 bg-white/20 -ml-3 mr-3" />
              )}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center flex-shrink-0 overflow-hidden shadow-medium">
                <Image src={item.icon} alt="" fill sizes="64px" className="object-cover scale-125" />
              </div>
              <span className="text-sm sm:text-base text-white font-medium whitespace-pre-line leading-tight">
                {item.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

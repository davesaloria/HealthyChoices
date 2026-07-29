'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const flavors = [
  {
    name: 'Strawberry',
    description: 'Sweet, fruity & bursting with real strawberries.',
    dot: 'bg-red-500',
  },
  {
    name: 'Mango',
    description: 'Tropical, creamy & made with real mangoes.',
    dot: 'bg-orange-400',
  },
  {
    name: 'Cranberry',
    description: 'Tart, refreshing & made with real cranberries.',
    dot: 'bg-rose-700',
  },
  {
    name: 'Blueberry',
    description: 'Sweet, tangy & loaded with real blueberries.',
    dot: 'bg-indigo-600',
  },
]

const badges = [
  'Live active cultures',
  'No added sugar',
  'Made with real fruits',
  'Good for your gut & you',
]

export function FlavorShowcase() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-cream-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-coral-100 text-coral-600 text-sm font-semibold mb-4">
            Live Healthy. Choose Healthy.
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Real Fruit. Real Flavor.
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            No syrups. No shortcuts. Just creamy CULTUR&apos;D Greek yogurt topped
            with real fruit, the way it should be.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Real photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden shadow-medium max-w-sm mx-auto"
          >
            <Image
              src="/images/flavors-showcase.jpg"
              alt="Healthy Choices flavors: strawberry, mango, cranberry, and blueberry Greek yogurt"
              width={800}
              height={1067}
              className="w-full h-auto"
            />
          </motion.div>

          {/* Flavor cards */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {flavors.map((flavor, idx) => (
                <motion.div
                  key={flavor.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl border border-charcoal-100 hover:border-primary-200 hover:shadow-soft transition-all bg-white"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${flavor.dot}`} />
                    <h3 className="font-bold text-charcoal-900">{flavor.name}</h3>
                  </div>
                  <p className="text-sm text-charcoal-600">{flavor.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

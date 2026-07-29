'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const benefits = [
  {
    title: 'Premium Quality',
    description: 'Crafted with care using only the finest ingredients.',
    image: '/images/product-classic-greek-yogurt.jpg',
    icon: '✨',
    points: ['Small-batch crafted', 'Pure ingredients', 'No fillers, ever'],
  },
  {
    title: 'High Protein',
    description: 'Packed with protein for muscle recovery and wellness.',
    image: '/images/foods-high-protein.jpg',
    icon: '💪',
    points: ['40g protein per tub', 'Supports muscle recovery', 'Keeps you full longer'],
  },
  {
    title: 'Probiotics',
    description: 'Live cultures for digestive health and vitality.',
    image: '/images/gallery-probiotic-milk.jpg',
    icon: '🦠',
    points: ['Live active cultures', 'Supports digestive health', 'Good for your gut'],
  },
  {
    title: 'Fresh Daily',
    description: 'Made fresh with no artificial additives or preservatives.',
    image: '/images/fresh-daily-stock.jpg',
    icon: '🌿',
    points: ['Handmade in small batches', 'No artificial additives', 'Refrigerated & ready'],
  },
]

export function BenefitsShowcase() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-sage-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Why Choose Healthy Choices?
          </h2>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            We blend premium ingredients with wellness expertise to create yogurt that tastes
            incredible and nourishes your body.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="bg-white rounded-2xl shadow-soft hover:shadow-medium transition-shadow h-full flex flex-col">
                <div className="relative h-40 rounded-t-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
                <div className="relative px-6 pb-6 flex-1 flex flex-col">
                  <div className="w-14 h-14 rounded-full bg-sage-100 ring-4 ring-white flex items-center justify-center text-2xl -mt-7 mb-4 shadow-medium">
                    {benefit.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-charcoal-900 mb-1">
                    {benefit.title}
                  </h3>
                  <div className="w-8 h-0.5 bg-primary-500 mb-3" />
                  <p className="text-sm text-charcoal-600 mb-4">{benefit.description}</p>
                  <ul className="mt-auto space-y-1.5 pt-4 border-t border-charcoal-100">
                    {benefit.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs text-charcoal-600"
                      >
                        <svg
                          className="w-3.5 h-3.5 text-primary-500 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

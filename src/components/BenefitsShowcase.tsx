'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const benefits = [
  {
    title: 'Premium Quality',
    description: 'Crafted with care using only the finest ingredients.',
    image: '/images/benefit-premium-quality.png',
  },
  {
    title: 'High Protein',
    description: 'Packed with protein for muscle recovery and wellness.',
    image: '/images/benefit-high-protein.png',
  },
  {
    title: 'Probiotics',
    description: 'Live cultures for digestive health and vitality.',
    image: '/images/benefit-probiotics.png',
  },
  {
    title: 'Fresh Daily',
    description: 'Made fresh with no artificial additives or preservatives.',
    image: '/images/benefit-fresh-daily.png',
  },
]

export function BenefitsShowcase() {
  return (
    <section className="py-20 md:py-28 bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-shadow"
            >
              <Image
                src={benefit.image}
                alt={`${benefit.title}: ${benefit.description}`}
                width={1536}
                height={1024}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full h-auto"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

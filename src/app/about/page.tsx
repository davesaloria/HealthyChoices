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
]

const behindTheScenes = [
  { src: '/images/story-mango-prep.jpg', alt: 'Mango yogurt jars being prepared fresh' },
  { src: '/images/story-ready-for-delivery.jpg', alt: 'Overnight oat jars ready for late-night delivery' },
  { src: '/images/gallery-probiotic-milk.jpg', alt: "CULTUR'D probiotic milk, ready to go" },
]

export default function AboutPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-16 border-b border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Our Story
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Crafting wellness, one spoonful at a time — homemade in Naga, Cebu.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-medium"
            >
              <Image
                src="/images/hero-yogurt-bowl.jpg"
                alt="Healthy Choices Greek yogurt bowl with fresh toppings"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-charcoal-600 mb-4 leading-relaxed">
                Healthy Choices started as a one-stop pantry for organic, natural,
                and wellness essentials — and grew around a simple idea: bring
                premium, homemade Greek yogurt to every table, made with real
                ingredients and no shortcuts.
              </p>
              <p className="text-lg text-charcoal-600 leading-relaxed">
                Every tub of <strong>CULTUR&apos;D</strong> Greek yogurt is
                handcrafted in small batches, pure and unsweetened with no
                fillers. We&apos;re not just making yogurt — we&apos;re showing up,
                jar by jar, for your health.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Journey / Stats */}
      <section className="relative py-20 bg-charcoal-900 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-14"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/20 text-primary-300 text-sm font-semibold mb-6">
              Our First Month
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              A fresh start. A healthier community.
            </h2>
            <p className="text-charcoal-300 leading-relaxed">
              From our kitchen to your home — thank you for making our first
              month so meaningful. Here&apos;s to what we accomplished together,
              and to many more months of health, happiness, and community.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-display font-bold text-white">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-charcoal-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {behindTheScenes.map((photo, idx) => (
              <motion.div
                key={photo.src}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-[4/5] rounded-xl overflow-hidden"
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-sage-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-display font-bold text-charcoal-900 mb-12 text-center">
            Healthy Choices, Better Lives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Gut-Friendly Probiotics',
                description: 'Live active cultures in every batch, for a happier gut',
                icon: '🦠',
              },
              {
                title: 'Clean, Natural Ingredients',
                description: 'Pure, unsweetened, no fillers — just real food',
                icon: '🌿',
              },
              {
                title: 'Sustained Energy',
                description: 'High in protein and fiber to fuel your whole day',
                icon: '⚡',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-charcoal-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-charcoal-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us */}
      <section className="py-16 bg-white border-t border-charcoal-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-4">
                Visit Us
              </h2>
              <p className="text-charcoal-600 mb-1 font-semibold">
                Casa Mira South, Langtad, City of Naga, Cebu
              </p>
              <p className="text-charcoal-600 mb-6">
                Open daily, 7:00 AM – 11:00 AM · Daily pick-ups available
              </p>
              <Link href="/contact">
                <Button size="lg">Get in Touch</Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden border border-charcoal-100"
            >
              <Image
                src="/images/product-bundle-pack.jpg"
                alt="Healthy Choices order ready for delivery"
                width={600}
                height={450}
                className="w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

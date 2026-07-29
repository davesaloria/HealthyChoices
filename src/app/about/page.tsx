'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Counter } from '@/components/Counter'
import { getAboutContent, fallbackAboutContent } from '@/lib/get-site-content'

const stats = [
  { value: 843, suffix: '+', label: "CULTUR'D tubs sold" },
  { value: 235, suffix: '+', label: 'Overnight oat jars sold' },
  { value: 281, suffix: '+', label: 'Happy customers' },
  { value: 24, suffix: '', label: 'Pantry products stocked' },
  { value: 4, suffix: '', label: 'Real fruit flavors' },
  { value: 5.0, suffix: '★', label: 'Google rating', decimals: 1 },
]

const behindTheScenes = [
  { src: '/images/story-mango-prep.jpg', alt: 'Mango yogurt jars being prepared fresh' },
  { src: '/images/story-ready-for-delivery.jpg', alt: 'Overnight oat jars ready for late-night delivery' },
  { src: '/images/gallery-probiotic-milk.jpg', alt: "CULTUR'D probiotic milk, ready to go" },
]

export default function AboutPage() {
  const [content, setContent] = useState(fallbackAboutContent)

  useEffect(() => {
    getAboutContent().then(setContent)
  }, [])

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-16 border-b border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            {content.heading}
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">{content.subheading}</p>
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
                src="/images/about-mission.jpg"
                alt="Holding a CULTUR'D Greek yogurt tub, 15.3g protein per 450mL"
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
                {content.missionTitle}
              </h2>
              {content.missionParagraphs.map((paragraph, idx) => (
                <p
                  key={idx}
                  className={`text-lg text-charcoal-600 leading-relaxed ${idx === 0 ? 'mb-4' : ''}`}
                >
                  {paragraph}
                </p>
              ))}
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
              Our Journey So Far
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              A fresh start. A healthier community.
            </h2>
            <p className="text-charcoal-300 leading-relaxed">
              From one homemade batch to a full pantry of wellness essentials —
              thank you for growing with us. Here&apos;s what we&apos;ve built
              together so far, and to many more months of health, happiness,
              and community.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mb-12">
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
                  <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                </p>
                <p className="text-sm text-charcoal-400 mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-charcoal-300 mb-16">
            <span className="inline-flex items-center gap-1.5">
              📍 Casa Mira South, Langtad, City of Naga, Cebu
            </span>
            <span className="inline-flex items-center gap-1.5">🕒 Open daily, 7:00 AM – 11:00 AM</span>
            <span className="inline-flex items-center gap-1.5">🚚 Local delivery across Naga</span>
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
      <section className="relative py-20 bg-gradient-to-b from-sage-50 via-cream-50 to-sage-50 overflow-hidden">
        {/* Decorative corner leaves */}
        <span
          className="absolute -top-4 -left-4 text-8xl opacity-40 blur-[2px] rotate-[-20deg] select-none pointer-events-none"
          aria-hidden
        >
          🍃
        </span>
        <span
          className="absolute -top-4 -right-4 text-8xl opacity-40 blur-[2px] rotate-[20deg] scale-x-[-1] select-none pointer-events-none"
          aria-hidden
        >
          🍃
        </span>

        <div className="container relative mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-2xl" aria-hidden>
              🌿
            </span>
            <div className="w-10 h-0.5 bg-primary-500 mx-auto my-3" />
            <h2 className="text-4xl font-display font-bold text-primary-900 mb-4">
              Healthy Choices, Better Lives
            </h2>
            <p className="text-charcoal-600 max-w-xl mx-auto leading-relaxed">
              We believe everyday choices lead to a healthier, happier you.
              <br />
              That&apos;s why every product we make is crafted with purpose.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Gut-Friendly Probiotics',
                description: (
                  <>
                    Live active cultures in every batch
                    <br />
                    to support a happier, healthier gut.
                  </>
                ),
                icon: '🦠',
              },
              {
                title: 'Clean, Natural Ingredients',
                description: (
                  <>
                    Pure, unsweetened, no fillers —
                    <br />
                    just real food your body loves.
                  </>
                ),
                icon: '🌿',
              },
              {
                title: 'Sustained Energy',
                description: (
                  <>
                    High in protein and fiber
                    <br />
                    to fuel your body all day long.
                  </>
                ),
                icon: '⚡',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative bg-white/70 backdrop-blur-sm rounded-2xl shadow-soft px-8 pt-10 pb-8 text-center"
              >
                {/* Icon badge with dashed ring + accent leaves/dots */}
                <div className="relative w-24 h-24 mx-auto mb-5 flex items-center justify-center">
                  <span className="absolute inset-0 rounded-full border-2 border-dashed border-primary-200" />
                  <span className="absolute inset-2 rounded-full bg-sage-50" />
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 text-sm opacity-60" aria-hidden>
                    🍃
                  </span>
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-1.5 h-1.5 rounded-full bg-primary-300" aria-hidden />
                  <span className="relative text-4xl">{value.icon}</span>
                </div>

                <h3 className="text-xl font-display font-bold text-primary-900 mb-2">
                  {value.title}
                </h3>
                <div className="w-8 h-0.5 bg-primary-400 mx-auto mb-3" />
                <p className="text-sm text-charcoal-600 mb-5 leading-relaxed">
                  {value.description}
                </p>

                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mx-auto text-lg">
                  {value.icon}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom decorative divider */}
          <div className="flex items-center justify-center gap-3 mt-16 text-primary-300">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-300" aria-hidden />
            <span className="w-16 h-px bg-primary-200" aria-hidden />
            <span className="text-lg" aria-hidden>
              🌿
            </span>
            <span className="w-16 h-px bg-primary-200" aria-hidden />
            <span className="w-1.5 h-1.5 rounded-full bg-primary-300" aria-hidden />
          </div>
        </div>

        {/* Wavy bottom edge */}
        <svg
          className="absolute bottom-0 left-0 w-full text-sage-100"
          viewBox="0 0 1440 60"
          fill="currentColor"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path d="M0,32 C240,64 480,0 720,16 C960,32 1200,64 1440,32 L1440,60 L0,60 Z" />
        </svg>
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
              <p className="text-charcoal-600 mb-1 font-semibold">{content.address}</p>
              <p className="text-charcoal-600 mb-6">{content.hours}</p>
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

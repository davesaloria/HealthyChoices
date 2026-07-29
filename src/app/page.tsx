'use client'

import { HeroSection } from '@/components/HeroSection'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
  const benefits = [
    {
      title: 'Premium Quality',
      description: 'Crafted with care using only the finest ingredients',
      icon: '✨',
    },
    {
      title: 'High Protein',
      description: 'Packed with protein for muscle recovery and wellness',
      icon: '💪',
    },
    {
      title: 'Probiotics',
      description: 'Live cultures for digestive health and vitality',
      icon: '🦠',
    },
    {
      title: 'Fresh Daily',
      description: 'Made fresh with no artificial additives or preservatives',
      icon: '🌿',
    },
  ]

  const featured = [
    {
      id: 1,
      name: 'Classic Greek Yogurt',
      price: 250,
      image: '/images/product-classic-greek-yogurt.jpg',
    },
    {
      id: 2,
      name: 'Mixed Berry Slushie',
      price: 320,
      image: '/images/product-mixed-berry.jpg',
    },
    {
      id: 3,
      name: 'Mango Delight',
      price: 280,
      image: '/images/product-mango-yogurt.jpg',
    },
    {
      id: 4,
      name: 'Honey Almond Bowl',
      price: 350,
      image: '/images/product-honey-almond-bowl.jpg',
    },
  ]

  return (
    <>
      {/* Hero */}
      <HeroSection />

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-sage-50">
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
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-sage-100 hover:border-primary-200">
                  <CardContent className="pt-8">
                    <div className="text-5xl mb-4">{benefit.icon}</div>
                    <CardTitle className="text-lg mb-2">{benefit.title}</CardTitle>
                    <CardDescription>{benefit.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-16"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900">
                Featured Products
              </h2>
              <p className="text-lg text-charcoal-600 mt-2">
                Customer favorites and bestsellers
              </p>
            </div>
            <Link href="/shop">
              <Button variant="outline">View All</Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featured.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-bold text-primary-500">
                        ₹{product.price}
                      </span>
                      <Button size="sm">Add</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Start Your Wellness Journey
            </h2>
            <p className="text-lg text-primary-100 mb-8 max-w-2xl mx-auto">
              Join thousands of customers who've made Healthy Choices part of their daily routine.
            </p>
            <Link href="/shop">
              <Button
                size="lg"
                className="bg-white text-primary-500 hover:bg-cream-50"
              >
                Shop Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}

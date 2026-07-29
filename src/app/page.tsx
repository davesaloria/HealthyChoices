'use client'

import { HeroSection } from '@/components/HeroSection'
import { OurJourney } from '@/components/OurJourney'
import { FlavorShowcase } from '@/components/FlavorShowcase'
import { BenefitsShowcase } from '@/components/BenefitsShowcase'
import { WellnessCTA } from '@/components/WellnessCTA'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Home() {
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

      {/* Our Journey */}
      <OurJourney />

      {/* Benefits Section */}
      <BenefitsShowcase />

      {/* Flavor Showcase */}
      <FlavorShowcase />

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
                        ₱{product.price}
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
      <WellnessCTA />
    </>
  )
}

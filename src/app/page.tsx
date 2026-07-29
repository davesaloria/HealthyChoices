'use client'

import { useEffect, useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { OurJourney } from '@/components/OurJourney'
import { FlavorShowcase } from '@/components/FlavorShowcase'
import { BenefitsShowcase } from '@/components/BenefitsShowcase'
import { WellnessCTA } from '@/components/WellnessCTA'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getProducts } from '@/lib/get-products'
import type { Product } from '@/lib/products-fallback'

export default function Home() {
  const [featured, setFeatured] = useState<Product[]>([])

  useEffect(() => {
    getProducts().then((data) => setFeatured(data.slice(0, 4)))
  }, [])

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
                <ProductCard product={product} />
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

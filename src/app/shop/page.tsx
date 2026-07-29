'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/Card'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'yogurt', 'slushies', 'toppings', 'bundles']

  const products = [
    {
      id: 1,
      name: 'Classic Greek Yogurt',
      category: 'yogurt',
      price: 250,
      protein: 20,
      image: '/images/product-classic-greek-yogurt.jpg',
      description: 'Plain, creamy Greek yogurt rich in protein',
    },
    {
      id: 2,
      name: 'Mixed Berry Slushie',
      category: 'slushies',
      price: 320,
      protein: 15,
      image: '/images/product-mixed-berry.jpg',
      description: 'Refreshing yogurt slushie with mixed berries',
    },
    {
      id: 3,
      name: 'Mango Yogurt',
      category: 'yogurt',
      price: 280,
      protein: 18,
      image: '/images/product-mango-yogurt.jpg',
      description: 'Tropical mango flavored Greek yogurt',
    },
    {
      id: 4,
      name: 'Honey Almonds',
      category: 'toppings',
      price: 180,
      protein: 8,
      image: '🍯',
      description: 'Crunchy honey roasted almonds',
    },
    {
      id: 5,
      name: 'Granola Mix',
      category: 'toppings',
      price: 150,
      protein: 6,
      image: '🥣',
      description: 'Homemade granola with nuts and seeds',
    },
    {
      id: 6,
      name: 'Bundle Pack',
      category: 'bundles',
      price: 999,
      protein: 60,
      image: '/images/product-bundle-pack.jpg',
      description: 'Variety pack with 6 yogurts',
    },
  ]

  const filtered =
    selectedCategory === 'all' ? products : products.filter((p) => p.category === selectedCategory)

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-12 border-b border-charcoal-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Shop Our Products
          </h1>
          <p className="text-lg text-charcoal-600">
            Discover our range of premium Greek yogurt and healthy toppings
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-charcoal-100 sticky top-20 z-30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary-500 text-white'
                    : 'bg-charcoal-100 text-charcoal-900 hover:bg-charcoal-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                layout
              >
                <Link href={`/product/${product.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all group cursor-pointer">
                    <div className="relative aspect-square bg-gradient-to-br from-sage-100 to-primary-100 flex items-center justify-center overflow-hidden">
                      {product.image.startsWith('/') ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 50vw, 33vw"
                          className="object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <span className="text-6xl group-hover:scale-110 transition-transform">
                          {product.image}
                        </span>
                      )}
                    </div>
                    <CardContent className="pt-4">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {product.description}
                      </CardDescription>
                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-2xl font-bold text-primary-500">₹{product.price}</p>
                          <p className="text-sm text-charcoal-600">{product.protein}g protein</p>
                        </div>
                        <Button size="sm">Add</Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

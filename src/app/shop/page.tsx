'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getProducts } from '@/lib/get-products'
import { categories, type Product } from '@/lib/products-fallback'
import { ProductCard } from '@/components/ProductCard'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data)
      setLoading(false)
    })
  }, [])

  const filtered =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory)

  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-12 border-b border-charcoal-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Shop Our Products
          </h1>
          <p className="text-lg text-charcoal-600">
            Our full pantry — Greek yogurt, superfoods, and wellness essentials
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-charcoal-100 sticky top-20 z-30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                  selectedCategory === cat.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-charcoal-100 text-charcoal-900 hover:bg-charcoal-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <p className="text-center text-charcoal-500">Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  layout
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

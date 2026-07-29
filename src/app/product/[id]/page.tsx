'use client'

import { Button } from '@/components/ui/Button'
import { Card, CardContent } from '@/components/ui/Card'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState('500ml')

  // Mock product data
  const product = {
    id: params.id,
    name: 'Classic Greek Yogurt',
    price: 250,
    rating: 4.8,
    reviews: 124,
    image: '/images/product-classic-greek-yogurt.jpg',
    gallery: [
      '/images/gallery-thick-strained.jpg',
      '/images/hero-yogurt-bowl.jpg',
      '/images/product-honey-almond-bowl.jpg',
    ],
    description: 'Our signature Greek yogurt, crafted with premium milk and live cultures.',
    details: {
      protein: '20g per 100g',
      calories: '59 cal per 100g',
      carbs: '3.2g per 100g',
      fat: '0.4g per 100g',
      sugar: '2.5g per 100g',
      probiotics: 'Contains live cultures',
    },
    ingredients: [
      'Milk',
      'Bacterial cultures (L. bulgaricus, S. thermophilus)',
      'Whey',
    ],
    sizes: ['250ml', '500ml', '1L'],
    recommended: [
      { id: 1, name: 'Granola Mix', image: '🥣', price: 150 },
      { id: 2, name: 'Mixed Berries', image: '/images/product-mixed-berry.jpg', price: 200 },
      { id: 3, name: 'Honey Almonds', image: '🍯', price: 180 },
    ],
  }

  return (
    <main className="py-12">
      <div className="container mx-auto px-4">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.gallery.map((src) => (
                <div
                  key={src}
                  className="relative aspect-square rounded-lg overflow-hidden cursor-pointer group"
                >
                  <Image
                    src={src}
                    alt={product.name}
                    fill
                    sizes="33vw"
                    className="object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <span className="text-2xl font-bold text-charcoal-900">{product.rating}</span>
              <div className="text-yellow-400">⭐⭐⭐⭐⭐</div>
              <span className="text-charcoal-600">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-4xl font-bold text-primary-500 mb-2">₱{product.price}</p>
              <p className="text-charcoal-600">Inclusive of VAT</p>
            </div>

            {/* Description */}
            <p className="text-lg text-charcoal-600 mb-8">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-charcoal-900 mb-3">
                Select Size
              </label>
              <div className="flex gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                      selectedSize === size
                        ? 'border-primary-500 bg-primary-50 text-primary-500'
                        : 'border-charcoal-200 text-charcoal-900 hover:border-primary-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-charcoal-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-4 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-charcoal-200 hover:bg-charcoal-50 flex items-center justify-center"
                >
                  −
                </button>
                <span className="text-2xl font-bold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg border border-charcoal-200 hover:bg-charcoal-50 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button size="lg" className="w-full mb-4">
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="w-full">
              Save for Later
            </Button>
          </motion.div>
        </div>

        {/* Nutrition Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-charcoal-900 mb-4">Nutrition Facts</h3>
                <div className="space-y-3">
                  {Object.entries(product.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-charcoal-600 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-semibold text-charcoal-900">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-charcoal-900 mb-4">Ingredients</h3>
                <ul className="space-y-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="text-charcoal-600 flex items-start gap-2">
                      <span className="text-primary-500 mt-0.5">•</span>
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-bold text-charcoal-900 mb-4">Storage</h3>
                <ul className="space-y-2 text-charcoal-600">
                  <li>• Keep refrigerated at 2-4°C</li>
                  <li>• Best consumed within 10 days</li>
                  <li>• Do not freeze</li>
                  <li>• Opened pack: consume within 5 days</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recommended Products */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
            Recommended Pairings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {product.recommended.map((item) => (
              <Card
                key={item.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="relative aspect-square bg-gradient-to-br from-sage-100 to-primary-100 flex items-center justify-center overflow-hidden">
                  {item.image.startsWith('/') ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="33vw"
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-5xl">{item.image}</span>
                  )}
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-bold text-charcoal-900 mb-2">{item.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-500">₱{item.price}</span>
                    <Button size="sm">Add</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getProducts } from '@/lib/get-products'
import { categories, type Product } from '@/lib/products-fallback'
import { ProductCard } from '@/components/ProductCard'
import useCartStore from '@/store/cart'
import { isImageUrl } from '@/lib/is-image-url'

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState<Product | null>(null)
  const [recommended, setRecommended] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  useEffect(() => {
    getProducts().then((all) => {
      const found = all.find((p) => p.slug === params.id) ?? null
      setProduct(found)
      if (found) {
        setRecommended(
          all.filter((p) => p.category === found.category && p.id !== found.id).slice(0, 3)
        )
      }
      setLoading(false)
    })
  }, [params.id])

  if (loading) {
    return (
      <main className="py-24 text-center text-charcoal-500">Loading product...</main>
    )
  }

  if (!product) {
    return (
      <main className="py-24 text-center">
        <h1 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
          Product not found
        </h1>
        <p className="text-charcoal-600">
          This product may have been removed. Check the{' '}
          <a href="/shop" className="text-primary-500 hover:underline">
            shop page
          </a>{' '}
          for our current lineup.
        </p>
      </main>
    )
  }

  const outOfStock = product.quantity <= 0
  const categoryLabel = categories.find((c) => c.value === product.category)?.label

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
            <div
              className={`relative aspect-square rounded-2xl overflow-hidden ${outOfStock ? 'grayscale' : ''}`}
            >
              {isImageUrl(product.image_url) ? (
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-sage-50 text-9xl">
                  {product.image_url}
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categoryLabel && (
              <span className="inline-block px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold mb-4">
                {categoryLabel}
              </span>
            )}
            <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-2">
              {product.name}
            </h1>
            {product.size && <p className="text-charcoal-500 mb-6">{product.size}</p>}

            {/* Price */}
            <div className="mb-8">
              <p className="text-4xl font-bold text-primary-500 mb-2">₱{product.price}</p>
              <p className="text-charcoal-600">Inclusive of VAT</p>
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-lg text-charcoal-600 mb-6">{product.description}</p>
            )}

            {/* Stock status */}
            <p className={`font-semibold mb-8 ${outOfStock ? 'text-coral-600' : 'text-primary-600'}`}>
              {outOfStock
                ? 'Out of stock'
                : product.quantity <= 10
                  ? `Only ${product.quantity} left in stock`
                  : `${product.quantity} in stock`}
            </p>

            {!outOfStock && (
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
                    onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                    className="w-10 h-10 rounded-lg border border-charcoal-200 hover:bg-charcoal-50 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <Button
              size="lg"
              className="w-full"
              disabled={outOfStock}
              onClick={() => {
                if (!product) return
                addItem(
                  {
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image_url: product.image_url,
                    size: product.size,
                  },
                  quantity
                )
                setAdded(true)
                setTimeout(() => setAdded(false), 1500)
              }}
            >
              {outOfStock ? 'Sold Out' : added ? 'Added to Cart ✓' : 'Add to Cart'}
            </Button>
          </motion.div>
        </div>

        {/* Recommended */}
        {recommended.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {recommended.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}

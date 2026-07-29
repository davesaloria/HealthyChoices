'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/Card'
import type { Product } from '@/lib/products-fallback'
import useCartStore from '@/store/cart'
import { isImageUrl } from '@/lib/is-image-url'

const LOW_STOCK_THRESHOLD = 10

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem)
  const [added, setAdded] = useState(false)
  const outOfStock = product.quantity <= 0
  const lowStock = !outOfStock && product.quantity <= LOW_STOCK_THRESHOLD
  const isImage = isImageUrl(product.image_url)

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      size: product.size,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const card = (
    <Card
      className={`h-full transition-all group ${
        outOfStock ? 'grayscale opacity-60' : 'hover:shadow-lg'
      }`}
    >
      <div className="relative aspect-square bg-gradient-to-br from-sage-100 to-primary-100 flex items-center justify-center overflow-hidden">
        {isImage ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className={`object-cover ${outOfStock ? '' : 'group-hover:scale-110 transition-transform'}`}
          />
        ) : (
          <span className="text-6xl">{product.image_url}</span>
        )}

        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-charcoal-900/40">
            <span className="px-3 py-1 rounded-full bg-charcoal-900 text-white text-xs font-bold uppercase tracking-wide">
              Out of Stock
            </span>
          </div>
        )}
        {lowStock && (
          <span className="absolute top-2 right-2 px-2 py-1 rounded-full bg-coral-500 text-white text-xs font-semibold">
            Only {product.quantity} left
          </span>
        )}
      </div>
      <CardContent className="pt-4">
        <CardTitle className="text-lg">{product.name}</CardTitle>
        {product.size && <CardDescription className="mt-1">{product.size}</CardDescription>}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-primary-500">₱{product.price}</p>
            <p className="text-xs text-charcoal-500">
              {outOfStock ? 'Out of stock' : `${product.quantity} in stock`}
            </p>
          </div>
          <Button size="sm" disabled={outOfStock} onClick={handleAdd}>
            {outOfStock ? 'Sold Out' : added ? 'Added ✓' : 'Add'}
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  if (outOfStock) {
    return <div className="h-full cursor-not-allowed">{card}</div>
  }

  return (
    <Link href={`/product/${product.slug}`} className="h-full block">
      {card}
    </Link>
  )
}

'use client'

import { useState } from 'react'
import { categories } from '@/lib/products-fallback'
import { Button } from '@/components/ui/Button'
import { ImageUploadField } from '@/components/admin/ImageUploadField'

interface ProductFormValues {
  name?: string
  category?: string
  size?: string | null
  price?: number
  quantity?: number
  protein?: number | null
  description?: string | null
  image_url?: string
}

export function ProductForm({
  product,
  action,
}: {
  product?: ProductFormValues
  action: (formData: FormData) => void | Promise<void>
}) {
  const selectableCategories = categories.filter((c) => c.value !== 'all')
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? '')

  return (
    <form action={action} className="space-y-5 max-w-xl bg-white rounded-2xl border border-charcoal-100 p-6">
      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Name</label>
        <input
          name="name"
          defaultValue={product?.name}
          required
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Category</label>
        <select
          name="category"
          defaultValue={product?.category ?? selectableCategories[0].value}
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        >
          {selectableCategories.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Size / weight
          </label>
          <input
            name="size"
            defaultValue={product?.size ?? ''}
            placeholder="e.g. 450ml"
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Price (₱)
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            defaultValue={product?.price}
            required
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Quantity in stock
          </label>
          <input
            type="number"
            name="quantity"
            defaultValue={product?.quantity ?? 0}
            required
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
          <p className="text-xs text-charcoal-500 mt-1">Set to 0 to mark as out of stock.</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Protein (g, optional)
          </label>
          <input
            type="number"
            name="protein"
            defaultValue={product?.protein ?? ''}
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
      </div>

      <ImageUploadField name="image_url" value={imageUrl} onChange={setImageUrl} folder="products" />

      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={product?.description ?? ''}
          rows={3}
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
        />
      </div>

      <Button type="submit" size="lg" className="w-full">
        {product ? 'Save Changes' : 'Create Product'}
      </Button>
    </form>
  )
}

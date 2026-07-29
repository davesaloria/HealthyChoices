'use client'

import { useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'

export function ImageUploadField({
  name,
  value,
  onChange,
  folder,
}: {
  name: string
  value: string
  onChange: (url: string) => void
  folder: string
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError(null)

    const supabase = createClient()
    const path = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '-')}`

    const { error: uploadError } = await supabase.storage.from('media').upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })

    if (uploadError) {
      setError(uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('media').getPublicUrl(path)
    onChange(data.publicUrl)
    setUploading(false)
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
        Image path or emoji
      </label>
      <input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        placeholder="/images/product-name.jpg or 🥬"
        className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
      />

      <div className="flex items-center gap-3 mt-2">
        <label className="px-3 py-1.5 rounded-lg border border-charcoal-200 text-sm font-medium text-charcoal-700 hover:bg-charcoal-50 cursor-pointer">
          {uploading ? 'Uploading...' : 'Upload a photo'}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
        {value.startsWith('/') || value.startsWith('http') ? (
          <span className="relative w-10 h-10 rounded-lg overflow-hidden border border-charcoal-100 flex-shrink-0">
            <Image src={value} alt="" fill className="object-cover" />
          </span>
        ) : null}
      </div>
      {error && <p className="text-xs text-coral-600 mt-1">{error}</p>}
      <p className="text-xs text-charcoal-500 mt-1">
        Upload a photo, or type a path/emoji directly.
      </p>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getActivePromotion, type Promotion } from '@/lib/get-promotion'

const DISMISS_KEY = 'hc-dismissed-promo'

export function PromoBanner() {
  const [promo, setPromo] = useState<Promotion | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    getActivePromotion().then((data) => {
      if (!data) return
      const dismissedId =
        typeof window !== 'undefined' ? sessionStorage.getItem(DISMISS_KEY) : null
      if (dismissedId === data.id) {
        setDismissed(true)
      }
      setPromo(data)
    })
  }, [])

  if (!promo || dismissed) return null

  const handleDismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, promo.id)
    setDismissed(true)
  }

  return (
    <div className="relative bg-primary-500 text-white text-sm">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-3 text-center">
        <span>{promo.message}</span>
        {promo.link_url && (
          <Link href={promo.link_url} className="font-bold underline underline-offset-2 flex-shrink-0">
            {promo.link_label || 'Learn more'}
          </Link>
        )}
      </div>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

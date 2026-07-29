'use client'

import { Button } from '@/components/ui/Button'

interface PromotionFormValues {
  message?: string
  link_url?: string | null
  link_label?: string | null
  is_active?: boolean
}

export function PromotionForm({
  promotion,
  action,
}: {
  promotion?: PromotionFormValues
  action: (formData: FormData) => void | Promise<void>
}) {
  return (
    <form action={action} className="space-y-5 max-w-xl bg-white rounded-2xl border border-charcoal-100 p-6">
      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Message</label>
        <input
          name="message"
          defaultValue={promotion?.message}
          required
          placeholder="🎉 Free delivery on orders over ₱500 this week!"
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Link URL (optional)
          </label>
          <input
            name="link_url"
            defaultValue={promotion?.link_url ?? ''}
            placeholder="/shop"
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Link label
          </label>
          <input
            name="link_label"
            defaultValue={promotion?.link_label ?? ''}
            placeholder="Shop Now"
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-charcoal-900">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={promotion?.is_active}
          className="w-4 h-4"
        />
        Show this banner on the site right now
      </label>

      <Button type="submit" size="lg" className="w-full">
        {promotion ? 'Save Changes' : 'Create Promotion'}
      </Button>
    </form>
  )
}

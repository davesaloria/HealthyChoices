import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { deletePromotion } from './actions'

export default async function AdminPromotionsPage() {
  const supabase = await createClient()
  const { data: promotions } = await supabase
    .from('promotions')
    .select('*')
    .order('updated_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal-900">Promotions</h1>
          <p className="text-charcoal-600 mt-1">
            The active promotion shows as a dismissible banner across the site.
          </p>
        </div>
        <Link
          href="/admin/promotions/new"
          className="px-4 py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition"
        >
          Add Promotion
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 divide-y divide-charcoal-100">
        {(promotions ?? []).map((promo) => (
          <div key={promo.id} className="p-5 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {promo.is_active ? (
                  <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                    Active
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-charcoal-100 text-charcoal-500 text-xs font-semibold">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-charcoal-900 font-medium">{promo.message}</p>
              {promo.link_url && (
                <p className="text-xs text-charcoal-500 mt-1">
                  Links to {promo.link_url} ({promo.link_label || 'no label'})
                </p>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm flex-shrink-0">
              <Link
                href={`/admin/promotions/${promo.id}/edit`}
                className="text-primary-600 hover:underline"
              >
                Edit
              </Link>
              <form action={deletePromotion.bind(null, promo.id)}>
                <button type="submit" className="text-coral-600 hover:underline">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {(!promotions || promotions.length === 0) && (
          <p className="p-8 text-center text-charcoal-500">
            No promotions yet.{' '}
            <Link href="/admin/promotions/new" className="text-primary-600 hover:underline">
              Create one
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  )
}

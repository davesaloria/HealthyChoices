import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updatePromotion } from '../../actions'
import { PromotionForm } from '../../PromotionForm'

export default async function EditPromotionPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: promotion } = await supabase
    .from('promotions')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  if (!promotion) {
    notFound()
  }

  const boundUpdate = updatePromotion.bind(null, params.id)

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">Edit Promotion</h1>
      <PromotionForm promotion={promotion} action={boundUpdate} />
    </div>
  )
}

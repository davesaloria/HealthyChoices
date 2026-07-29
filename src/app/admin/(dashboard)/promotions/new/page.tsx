import { createPromotion } from '../actions'
import { PromotionForm } from '../PromotionForm'

export default function NewPromotionPage() {
  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">Add Promotion</h1>
      <PromotionForm action={createPromotion} />
    </div>
  )
}

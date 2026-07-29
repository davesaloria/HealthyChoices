'use client'

import { Button } from '@/components/ui/Button'
import type { RecipeIngredient } from '@/lib/recipes-fallback'

interface RecipeFormValues {
  title?: string
  image_url?: string
  time_label?: string | null
  servings_label?: string | null
  description?: string | null
  ingredients?: RecipeIngredient[]
  steps?: string[]
}

export function RecipeForm({
  recipe,
  action,
}: {
  recipe?: RecipeFormValues
  action: (formData: FormData) => void | Promise<void>
}) {
  return (
    <form action={action} className="space-y-5 max-w-xl bg-white rounded-2xl border border-charcoal-100 p-6">
      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Title</label>
        <input
          name="title"
          defaultValue={recipe?.title}
          required
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Image path</label>
        <input
          name="image_url"
          defaultValue={recipe?.image_url}
          required
          placeholder="/images/recipes/your-photo.jpg"
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Time label
          </label>
          <input
            name="time_label"
            defaultValue={recipe?.time_label ?? ''}
            placeholder="e.g. 5 min prep"
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
            Servings label
          </label>
          <input
            name="servings_label"
            defaultValue={recipe?.servings_label ?? ''}
            placeholder="e.g. 1 bowl"
            className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={recipe?.description ?? ''}
          rows={3}
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">
          Ingredients
        </label>
        <textarea
          name="ingredients"
          defaultValue={recipe?.ingredients?.map((i) => i.label).join('\n')}
          rows={5}
          placeholder={'One per line, e.g.\nRolled oats\nChia seeds'}
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
        />
        <p className="text-xs text-charcoal-500 mt-1">One ingredient per line.</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-charcoal-900 mb-1.5">Steps</label>
        <textarea
          name="steps"
          defaultValue={recipe?.steps?.join('\n')}
          rows={5}
          placeholder={'One step per line, e.g.\nCombine oats and milk in a jar.\nRefrigerate overnight.'}
          className="w-full px-4 py-2.5 border border-charcoal-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 resize-none"
        />
        <p className="text-xs text-charcoal-500 mt-1">One step per line, in order.</p>
      </div>

      <Button type="submit" size="lg" className="w-full">
        {recipe ? 'Save Changes' : 'Create Recipe'}
      </Button>
    </form>
  )
}

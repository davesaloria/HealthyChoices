import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateRecipe } from '../../actions'
import { RecipeForm } from '../../RecipeForm'

export default async function EditRecipePage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: recipe } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  if (!recipe) {
    notFound()
  }

  const boundUpdate = updateRecipe.bind(null, params.id)

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
        Edit {recipe.title}
      </h1>
      <RecipeForm recipe={recipe} action={boundUpdate} />
    </div>
  )
}

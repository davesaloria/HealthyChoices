import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { deleteRecipe } from './actions'

export default async function AdminRecipesPage() {
  const supabase = await createClient()
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal-900">Recipes</h1>
          <p className="text-charcoal-600 mt-1">{recipes?.length ?? 0} recipes</p>
        </div>
        <Link
          href="/admin/recipes/new"
          className="px-4 py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition"
        >
          Add Recipe
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(recipes ?? []).map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden"
          >
            <div className="relative aspect-video">
              <Image src={recipe.image_url} alt={recipe.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-charcoal-900 mb-1">{recipe.title}</h3>
              <p className="text-xs text-charcoal-500 mb-3">
                {recipe.time_label} {recipe.servings_label ? `· ${recipe.servings_label}` : ''}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <Link
                  href={`/admin/recipes/${recipe.id}/edit`}
                  className="text-primary-600 hover:underline"
                >
                  Edit
                </Link>
                <form action={deleteRecipe.bind(null, recipe.id)}>
                  <button type="submit" className="text-coral-600 hover:underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!recipes || recipes.length === 0) && (
        <p className="p-8 text-center text-charcoal-500">
          No recipes yet. Run the SQL migration, then{' '}
          <Link href="/admin/recipes/new" className="text-primary-600 hover:underline">
            add your first recipe
          </Link>
          .
        </p>
      )}
    </div>
  )
}

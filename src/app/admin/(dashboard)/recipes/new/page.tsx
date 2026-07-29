import { createRecipe } from '../actions'
import { RecipeForm } from '../RecipeForm'

export default function NewRecipePage() {
  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">Add Recipe</h1>
      <RecipeForm action={createRecipe} />
    </div>
  )
}

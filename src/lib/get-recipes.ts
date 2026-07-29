import { createClient } from '@/lib/supabase/client'
import { fallbackRecipes, type Recipe } from '@/lib/recipes-fallback'

export async function getRecipes(): Promise<Recipe[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackRecipes
    }
    return data as Recipe[]
  } catch {
    return fallbackRecipes
  }
}

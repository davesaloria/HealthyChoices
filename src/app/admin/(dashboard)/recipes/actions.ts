'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function linesToArray(value: FormDataEntryValue | null) {
  return String(value ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

function buildRecipePayload(formData: FormData) {
  const title = String(formData.get('title') ?? '').trim()
  const image_url = String(formData.get('image_url') ?? '').trim()
  const time_label = String(formData.get('time_label') ?? '').trim() || null
  const servings_label = String(formData.get('servings_label') ?? '').trim() || null
  const description = String(formData.get('description') ?? '').trim() || null
  const ingredients = linesToArray(formData.get('ingredients')).map((label) => ({ label }))
  const steps = linesToArray(formData.get('steps'))

  return { title, image_url, time_label, servings_label, description, ingredients, steps }
}

export async function createRecipe(formData: FormData) {
  const supabase = await createClient()
  const payload = buildRecipePayload(formData)

  const { error } = await supabase.from('recipes').insert({
    ...payload,
    slug: slugify(payload.title),
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/recipes')
  revalidatePath('/recipes')
  redirect('/admin/recipes')
}

export async function updateRecipe(id: string, formData: FormData) {
  const supabase = await createClient()
  const payload = buildRecipePayload(formData)

  const { error } = await supabase
    .from('recipes')
    .update({ ...payload, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/recipes')
  revalidatePath('/recipes')
  redirect('/admin/recipes')
}

export async function deleteRecipe(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('recipes').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/recipes')
  revalidatePath('/recipes')
}

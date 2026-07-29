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

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name = String(formData.get('name') ?? '').trim()
  const category = String(formData.get('category') ?? '')
  const size = String(formData.get('size') ?? '').trim() || null
  const price = Number(formData.get('price'))
  const quantity = Number(formData.get('quantity'))
  const protein = formData.get('protein') ? Number(formData.get('protein')) : null
  const description = String(formData.get('description') ?? '').trim() || null
  const image_url = String(formData.get('image_url') ?? '').trim()

  const { error } = await supabase.from('products').insert({
    name,
    slug: slugify(name),
    category,
    size,
    price,
    quantity,
    protein,
    description,
    image_url,
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  revalidatePath('/')
  redirect('/admin/products')
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = String(formData.get('name') ?? '').trim()
  const category = String(formData.get('category') ?? '')
  const size = String(formData.get('size') ?? '').trim() || null
  const price = Number(formData.get('price'))
  const quantity = Number(formData.get('quantity'))
  const protein = formData.get('protein') ? Number(formData.get('protein')) : null
  const description = String(formData.get('description') ?? '').trim() || null
  const image_url = String(formData.get('image_url') ?? '').trim()

  const { error } = await supabase
    .from('products')
    .update({
      name,
      category,
      size,
      price,
      quantity,
      protein,
      description,
      image_url,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  revalidatePath('/')
  redirect('/admin/products')
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('products').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/products')
  revalidatePath('/shop')
  revalidatePath('/')
}

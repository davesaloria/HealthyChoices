'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

function buildPayload(formData: FormData) {
  return {
    message: String(formData.get('message') ?? '').trim(),
    link_url: String(formData.get('link_url') ?? '').trim() || null,
    link_label: String(formData.get('link_label') ?? '').trim() || null,
    is_active: formData.get('is_active') === 'on',
  }
}

export async function createPromotion(formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase.from('promotions').insert(buildPayload(formData))

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/promotions')
  redirect('/admin/promotions')
}

export async function updatePromotion(id: string, formData: FormData) {
  const supabase = await createClient()
  const { error } = await supabase
    .from('promotions')
    .update({ ...buildPayload(formData), updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/promotions')
  redirect('/admin/promotions')
}

export async function deletePromotion(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('promotions').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/promotions')
}

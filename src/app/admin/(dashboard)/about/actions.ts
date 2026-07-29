'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function updateAboutContent(formData: FormData) {
  const supabase = await createClient()

  const value = {
    heading: String(formData.get('heading') ?? '').trim(),
    subheading: String(formData.get('subheading') ?? '').trim(),
    missionTitle: String(formData.get('missionTitle') ?? '').trim(),
    missionParagraphs: [
      String(formData.get('missionParagraph1') ?? '').trim(),
      String(formData.get('missionParagraph2') ?? '').trim(),
    ].filter(Boolean),
    address: String(formData.get('address') ?? '').trim(),
    hours: String(formData.get('hours') ?? '').trim(),
  }

  const { error } = await supabase
    .from('site_content')
    .upsert({ key: 'about', value, updated_at: new Date().toISOString() }, { onConflict: 'key' })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/about')
  revalidatePath('/about')
  redirect('/admin/about?saved=1')
}

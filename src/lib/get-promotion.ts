import { createClient } from '@/lib/supabase/client'

export interface Promotion {
  id: string
  message: string
  link_url: string | null
  link_label: string | null
  is_active: boolean
}

export async function getActivePromotion(): Promise<Promotion | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error || !data) return null
    return data as Promotion
  } catch {
    return null
  }
}

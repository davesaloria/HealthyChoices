'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function updateOrderStatus(orderId: string, formData: FormData) {
  const supabase = await createClient()
  const status = String(formData.get('status') ?? '')

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin/orders')
}

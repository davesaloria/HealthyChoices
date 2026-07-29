'use client'

import { createBrowserClient } from '@supabase/auth-helpers-nextjs'
import { ReactNode } from 'react'

export function SupabaseProvider({ children }: { children: ReactNode }) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

  const supabase = createBrowserClient(supabaseUrl, supabaseKey)

  return <>{children}</>
}

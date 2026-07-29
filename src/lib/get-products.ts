import { createClient } from '@/lib/supabase/client'
import { fallbackProducts, type Product } from '@/lib/products-fallback'

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('sort_order', { ascending: true })

    if (error || !data || data.length === 0) {
      return fallbackProducts
    }
    return data as Product[]
  } catch {
    return fallbackProducts
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts()
  return products.find((p) => p.slug === slug)
}

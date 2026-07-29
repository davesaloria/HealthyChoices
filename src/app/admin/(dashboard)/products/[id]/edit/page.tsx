import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { updateProduct } from '../../actions'
import { ProductForm } from '../../ProductForm'

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .maybeSingle()

  if (!product) {
    notFound()
  }

  const boundUpdate = updateProduct.bind(null, params.id)

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-8">
        Edit {product.name}
      </h1>
      <ProductForm product={product} action={boundUpdate} />
    </div>
  )
}

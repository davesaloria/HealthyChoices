import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import { deleteProduct } from './actions'

export default async function AdminProductsPage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-charcoal-900">Products</h1>
          <p className="text-charcoal-600 mt-1">{products?.length ?? 0} products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition"
        >
          Add Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-charcoal-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-50 text-charcoal-600 text-left">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product) => {
              const outOfStock = product.quantity <= 0
              return (
                <tr key={product.id} className="border-t border-charcoal-100">
                  <td className="px-4 py-3 flex items-center gap-3">
                    {product.image_url?.startsWith('/') ? (
                      <span className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <Image src={product.image_url} alt="" fill className="object-cover" />
                      </span>
                    ) : (
                      <span className="w-10 h-10 rounded-lg bg-sage-50 flex items-center justify-center text-xl flex-shrink-0">
                        {product.image_url}
                      </span>
                    )}
                    <div>
                      <p className="font-semibold text-charcoal-900">{product.name}</p>
                      {product.size && <p className="text-xs text-charcoal-500">{product.size}</p>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-charcoal-600">{product.category}</td>
                  <td className="px-4 py-3 text-charcoal-900 font-semibold">₱{product.price}</td>
                  <td className="px-4 py-3">
                    {outOfStock ? (
                      <span className="px-2 py-1 rounded-full bg-coral-100 text-coral-700 text-xs font-semibold">
                        Out of stock
                      </span>
                    ) : (
                      <span className="text-charcoal-700">{product.quantity}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="text-primary-600 hover:underline mr-4"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)} className="inline">
                      <button type="submit" className="text-coral-600 hover:underline">
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {(!products || products.length === 0) && (
          <p className="p-8 text-center text-charcoal-500">
            No products yet. Run the SQL migration, then{' '}
            <Link href="/admin/products/new" className="text-primary-600 hover:underline">
              add your first product
            </Link>
            .
          </p>
        )}
      </div>
    </div>
  )
}

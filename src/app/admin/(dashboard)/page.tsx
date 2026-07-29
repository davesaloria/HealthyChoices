import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const [{ data: products }, { data: recipes }, { data: promotions }, { data: orders }] =
    await Promise.all([
      supabase.from('products').select('id, quantity'),
      supabase.from('recipes').select('id'),
      supabase.from('promotions').select('id, is_active').eq('is_active', true),
      supabase.from('orders').select('id, status'),
    ])

  const totalProducts = products?.length ?? 0
  const outOfStock = products?.filter((p) => p.quantity <= 0).length ?? 0
  const totalRecipes = recipes?.length ?? 0
  const activePromo = (promotions?.length ?? 0) > 0
  const pendingOrders = orders?.filter((o) => o.status === 'pending').length ?? 0

  const cards = [
    { label: 'Pending Orders', value: pendingOrders, href: '/admin/orders' },
    { label: 'Products', value: totalProducts, href: '/admin/products' },
    { label: 'Out of Stock', value: outOfStock, href: '/admin/products' },
    { label: 'Recipes', value: totalRecipes, href: '/admin/recipes' },
    { label: 'Active Promotion', value: activePromo ? 'Yes' : 'None', href: '/admin/promotions' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-charcoal-900 mb-2">Dashboard</h1>
      <p className="text-charcoal-600 mb-8">
        Manage your products, recipes, promotions, and About page content.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl border border-charcoal-100 p-6 hover:shadow-medium transition-shadow"
          >
            <p className="text-3xl font-bold text-charcoal-900">{card.value}</p>
            <p className="text-sm text-charcoal-600 mt-1">{card.label}</p>
          </Link>
        ))}
      </div>

      {(!products || products.length === 0) && (
        <div className="mt-8 p-4 rounded-xl bg-coral-50 border border-coral-200 text-coral-700 text-sm">
          No products found. Have you run <code>supabase/migrations/0001_cms_schema.sql</code>{' '}
          in your Supabase SQL Editor yet?
        </div>
      )}
    </div>
  )
}

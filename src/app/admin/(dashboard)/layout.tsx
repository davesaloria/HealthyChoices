import Link from 'next/link'
import { requireAdmin } from '@/lib/admin/require-admin'
import { SignOutButton } from './SignOutButton'

const navItems = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/products', label: 'Products' },
  { href: '/admin/recipes', label: 'Recipes' },
  { href: '/admin/promotions', label: 'Promotions' },
  { href: '/admin/about', label: 'About Page' },
]

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = await requireAdmin()

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-charcoal-50">
      <aside className="w-full md:w-64 md:flex-shrink-0 bg-charcoal-900 text-white p-6 flex flex-row md:flex-col justify-between md:justify-start">
        <div>
          <Link href="/" className="font-display font-bold text-xl block mb-8">
            Healthy Choices
          </Link>
          <nav className="hidden md:block space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-lg hover:bg-white/10 text-sm transition"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="md:mt-auto md:pt-6 md:border-t md:border-white/10 text-right md:text-left">
          <p className="text-xs text-charcoal-400 mb-2 hidden md:block">{user.email}</p>
          <SignOutButton />
        </div>
      </aside>

      {/* Mobile nav */}
      <nav className="md:hidden flex flex-wrap gap-2 bg-white border-b border-charcoal-100 px-4 py-3">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="px-3 py-1.5 rounded-lg bg-charcoal-100 text-charcoal-900 text-sm"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">{children}</main>
    </div>
  )
}

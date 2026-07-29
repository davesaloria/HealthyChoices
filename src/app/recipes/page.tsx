import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: 'Recipes | Healthy Choices',
  description: 'Healthy, homemade recipe ideas using Healthy Choices Greek yogurt — coming soon.',
}

export default function RecipesPage() {
  return (
    <main className="py-20">
      <div className="container mx-auto px-4 text-center max-w-xl">
        <div className="relative w-64 h-64 mx-auto mb-8 rounded-3xl overflow-hidden shadow-medium">
          <Image
            src="/images/coming-soon.jpg"
            alt="Something new is coming from Healthy Choices"
            fill
            className="object-cover"
          />
        </div>
        <h1 className="text-4xl font-display font-bold text-charcoal-900 mb-4">
          Recipes are coming soon
        </h1>
        <p className="text-lg text-charcoal-600 mb-8">
          We&apos;re cooking up healthy snack bowls, overnight oats, and yogurt
          bowl ideas using CULTUR&apos;D Greek yogurt. Check back soon, or shop
          our current lineup in the meantime.
        </p>
        <Link href="/shop">
          <Button size="lg">Shop Our Products</Button>
        </Link>
      </div>
    </main>
  )
}

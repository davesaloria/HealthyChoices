'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'

const recipes = [
  {
    title: 'Protein-Packed Overnight Oats',
    image: '/images/recipes/overnight-oats.jpg',
    time: '5 min prep · overnight',
    servings: '1 jar',
    description:
      'A make-ahead breakfast that keeps you full all morning. Layer it the night before and grab it on your way out the door.',
    ingredients: [
      { label: 'Rolled oats', image: '/images/recipes/overnight-oats.jpg' },
      { label: 'Chia seeds', image: '/images/recipes/ing-chia-seeds.jpg' },
      { label: 'Oat milk', image: '/images/recipes/ing-oat-milk.jpg' },
      { label: 'CULTUR’D Greek yogurt', image: '/images/product-classic-greek-yogurt.jpg' },
    ],
    steps: [
      'Combine rolled oats, chia seeds, and oat milk in a jar.',
      'Stir in a spoonful of CULTUR’D Greek yogurt for extra protein and creaminess.',
      'Cover and refrigerate overnight (at least 6 hours).',
      'Top with your favorite fruit before serving.',
    ],
  },
  {
    title: 'Loaded CULTUR’D Yogurt Bowl',
    image: '/images/recipes/loaded-yogurt-bowl.jpg',
    time: '5 min',
    servings: '1 bowl',
    description:
      'Our signature Thick and Strained Greek yogurt, dressed up with dried fruit, walnuts, and a drizzle of wild honey.',
    ingredients: [
      { label: 'CULTUR’D Greek yogurt', image: '/images/recipes/loaded-yogurt-bowl.jpg' },
      { label: 'Dried blueberries', image: '/images/recipes/ing-dried-blueberries.jpg' },
      { label: 'Dried strawberries', image: '/images/recipes/ing-dried-strawberries.jpg' },
      { label: 'Walnuts', image: '/images/recipes/ing-walnuts.jpg' },
      { label: 'Wild honey', image: '/images/recipes/ing-wild-honey.jpg' },
    ],
    steps: [
      'Spoon CULTUR’D Greek yogurt into a bowl.',
      'Top with dried blueberries, dried strawberries, and walnuts.',
      'Finish with a generous drizzle of wild honey.',
    ],
  },
  {
    title: 'No-Bake Trail Mix Bites',
    image: '/images/recipes/trail-mix-bites.jpg',
    time: '15 min',
    servings: '12 bites',
    description:
      'A grab-and-go snack for busy days — naturally sweetened and packed with nuts and seeds.',
    ingredients: [
      { label: 'Cashews', image: '/images/recipes/trail-mix-bites.jpg' },
      { label: 'Pumpkin seeds', image: '/images/recipes/ing-pumpkin-seeds.jpg' },
      { label: 'Sliced almonds', image: '/images/recipes/ing-sliced-almonds.jpg' },
      { label: 'Pitted dates', image: '/images/recipes/ing-pitted-dates.jpg' },
      { label: 'Monk fruit sweetener', image: '/images/recipes/ing-monkfruit.jpg' },
    ],
    steps: [
      'Pulse pitted dates in a food processor until they form a sticky paste.',
      'Fold in chopped cashews, pumpkin seeds, and sliced almonds.',
      'Sweeten to taste with monk fruit sweetener.',
      'Roll into bite-sized balls and refrigerate for at least 30 minutes.',
    ],
  },
  {
    title: 'Keto Peanut Butter Yogurt Cup',
    image: '/images/recipes/pb-yogurt-cup.jpg',
    time: '5 min',
    servings: '1 cup',
    description:
      'A high-protein, low-sugar treat for anyone watching their carbs without giving up dessert.',
    ingredients: [
      { label: 'CULTUR’D Greek yogurt', image: '/images/product-classic-greek-yogurt.jpg' },
      { label: 'Keto peanut butter', image: '/images/recipes/pb-yogurt-cup.jpg' },
      { label: 'Chia seeds', image: '/images/recipes/ing-chia-seeds.jpg' },
      { label: 'Monk fruit sweetener', image: '/images/recipes/ing-monkfruit.jpg' },
    ],
    steps: [
      'Spoon CULTUR’D Greek yogurt into a cup.',
      'Swirl in keto peanut butter and a pinch of monk fruit sweetener.',
      'Sprinkle chia seeds on top and serve chilled.',
    ],
  },
]

export default function RecipesPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-b from-sage-50 to-white py-16 border-b border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-charcoal-900 mb-4">
            Recipes
          </h1>
          <p className="text-lg text-charcoal-600 max-w-2xl mx-auto">
            Simple, healthy ideas using CULTUR&apos;D Greek yogurt and the pantry
            staples we stock in-store.
          </p>
        </div>
      </section>

      {/* Recipes */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl space-y-16">
          {recipes.map((recipe, idx) => (
            <motion.div
              key={recipe.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-medium">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-charcoal-900 mb-2">
                    {recipe.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-charcoal-600 mb-4">
                    <span>{recipe.time}</span>
                    <span>&middot;</span>
                    <span>{recipe.servings}</span>
                  </div>
                  <p className="text-charcoal-600 mb-6 leading-relaxed">
                    {recipe.description}
                  </p>

                  <h3 className="font-semibold text-charcoal-900 mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {recipe.ingredients.map((ing) => (
                      <span
                        key={ing.label}
                        className="inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-sage-50 border border-sage-100 text-sm text-charcoal-700"
                      >
                        <span className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                          <Image src={ing.image} alt="" fill className="object-cover" />
                        </span>
                        {ing.label}
                      </span>
                    ))}
                  </div>

                  <h3 className="font-semibold text-charcoal-900 mb-3">Steps</h3>
                  <ol className="space-y-2">
                    {recipe.steps.map((step, stepIdx) => (
                      <li key={stepIdx} className="flex gap-3 text-charcoal-600">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500 text-white text-xs font-bold flex items-center justify-center">
                          {stepIdx + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sage-50 border-t border-charcoal-100">
        <div className="container mx-auto px-4 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-2xl font-display font-bold text-charcoal-900 mb-2">
                Have everything you need?
              </h2>
              <p className="text-charcoal-600 mb-6">
                Shop the CULTUR&apos;D Greek yogurt and pantry staples used in
                these recipes.
              </p>
              <a
                href="/shop"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-500 text-white font-semibold hover:bg-primary-600 transition"
              >
                Shop Now
              </a>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}

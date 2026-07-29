'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/Card'
import { getRecipes } from '@/lib/get-recipes'
import type { Recipe } from '@/lib/recipes-fallback'

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    getRecipes().then(setRecipes)
  }, [])

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
              key={recipe.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-medium">
                  <Image
                    src={recipe.image_url}
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
                    {recipe.time_label && <span>{recipe.time_label}</span>}
                    {recipe.time_label && recipe.servings_label && <span>&middot;</span>}
                    {recipe.servings_label && <span>{recipe.servings_label}</span>}
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
                        {ing.image && (
                          <span className="relative w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                            <Image src={ing.image} alt="" fill className="object-cover" />
                          </span>
                        )}
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

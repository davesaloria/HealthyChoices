export interface RecipeIngredient {
  label: string
  image?: string | null
}

export interface Recipe {
  id: string
  title: string
  slug: string
  image_url: string
  time_label: string | null
  servings_label: string | null
  description: string | null
  ingredients: RecipeIngredient[]
  steps: string[]
  sort_order: number
}

// Mirrors supabase/migrations/0001_cms_schema.sql seed data.
export const fallbackRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Protein-Packed Overnight Oats',
    slug: 'protein-packed-overnight-oats',
    image_url: '/images/recipes/overnight-oats.jpg',
    time_label: '5 min prep · overnight',
    servings_label: '1 jar',
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
    sort_order: 1,
  },
  {
    id: '2',
    title: 'Loaded CULTUR’D Yogurt Bowl',
    slug: 'loaded-culturd-yogurt-bowl',
    image_url: '/images/recipes/loaded-yogurt-bowl.jpg',
    time_label: '5 min',
    servings_label: '1 bowl',
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
    sort_order: 2,
  },
  {
    id: '3',
    title: 'No-Bake Trail Mix Bites',
    slug: 'no-bake-trail-mix-bites',
    image_url: '/images/recipes/trail-mix-bites.jpg',
    time_label: '15 min',
    servings_label: '12 bites',
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
    sort_order: 3,
  },
  {
    id: '4',
    title: 'Keto Peanut Butter Yogurt Cup',
    slug: 'keto-peanut-butter-yogurt-cup',
    image_url: '/images/recipes/pb-yogurt-cup.jpg',
    time_label: '5 min',
    servings_label: '1 cup',
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
    sort_order: 4,
  },
]

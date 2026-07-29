export interface Product {
  id: string
  name: string
  slug: string
  category: string
  size: string | null
  price: number
  quantity: number
  protein: number | null
  description: string | null
  image_url: string
  sort_order: number
}

export const categories = [
  { value: 'all', label: 'All' },
  { value: 'dairy-probiotics', label: 'Dairy & Probiotics' },
  { value: 'superfoods-nuts', label: 'Superfoods & Nuts' },
  { value: 'dried-fruits', label: 'Dried Fruits' },
  { value: 'grains-plant-milk', label: 'Grains & Plant Milk' },
  { value: 'breakfast-snacks', label: 'Breakfast & Snacks' },
  { value: 'sweeteners', label: 'Sweeteners' },
  { value: 'fresh-produce', label: 'Fresh Produce' },
]

// Mirrors supabase/migrations/0001_cms_schema.sql seed data.
// Used whenever Supabase isn't reachable yet (e.g. the migration
// hasn't been run), so the site never shows an empty shop.
export const fallbackProducts: Product[] = [
  { id: '1', name: 'CULTUR’D Classic Greek Yogurt', slug: 'culturd-classic-greek-yogurt', category: 'dairy-probiotics', size: '450ml', price: 199, quantity: 40, protein: 15, description: 'Pure, unsweetened Greek yogurt with no fillers.', image_url: '/images/product-classic-greek-yogurt.jpg', sort_order: 1 },
  { id: '2', name: 'CULTUR’D High Protein Greek Yogurt', slug: 'culturd-high-protein-greek-yogurt', category: 'dairy-probiotics', size: '450ml', price: 399, quantity: 25, protein: 20, description: 'Extra-thick and strained for maximum protein per spoonful.', image_url: '/images/product-high-protein-yogurt.jpg', sort_order: 2 },
  { id: '3', name: 'CULTUR’D Probiotic Drink', slug: 'culturd-probiotic-drink', category: 'dairy-probiotics', size: '450ml', price: 169, quantity: 30, protein: null, description: 'A drinkable dose of live active cultures for your gut.', image_url: '/images/product-probiotic-drink.jpg', sort_order: 3 },
  { id: '4', name: 'Chia Seeds', slug: 'chia-seeds', category: 'superfoods-nuts', size: '50g', price: 79, quantity: 50, protein: null, description: 'Organic chia seeds, packed with fiber and omega-3s.', image_url: '/images/recipes/ing-chia-seeds.jpg', sort_order: 4 },
  { id: '5', name: 'Walnuts', slug: 'walnuts', category: 'superfoods-nuts', size: '50g', price: 109, quantity: 45, protein: null, description: 'Crunchy, heart-healthy walnuts.', image_url: '/images/recipes/ing-walnuts.jpg', sort_order: 5 },
  { id: '6', name: 'Pumpkin Seeds', slug: 'pumpkin-seeds', category: 'superfoods-nuts', size: '50g', price: 79, quantity: 40, protein: null, description: 'Roasted pumpkin seeds for topping bowls or snacking.', image_url: '/images/recipes/ing-pumpkin-seeds.jpg', sort_order: 6 },
  { id: '7', name: 'Sliced Almonds', slug: 'sliced-almonds', category: 'superfoods-nuts', size: '50g', price: 109, quantity: 35, protein: null, description: 'Blanched, sliced almonds.', image_url: '/images/recipes/ing-sliced-almonds.jpg', sort_order: 7 },
  { id: '8', name: 'Rolled Oats', slug: 'rolled-oats', category: 'superfoods-nuts', size: '250g', price: 119, quantity: 60, protein: null, description: 'Whole grain rolled oats for overnight oats and baking.', image_url: '/images/recipes/overnight-oats.jpg', sort_order: 8 },
  { id: '9', name: 'Roasted Cashew Splits', slug: 'roasted-cashew-splits', category: 'superfoods-nuts', size: '50g', price: 89, quantity: 0, protein: null, description: 'Roasted cashew pieces.', image_url: '/images/recipes/trail-mix-bites.jpg', sort_order: 9 },
  { id: '10', name: 'Keto Peanut Butter', slug: 'keto-peanut-butter', category: 'superfoods-nuts', size: '500g', price: 299, quantity: 20, protein: null, description: 'Low-carb, no-sugar-added peanut butter.', image_url: '/images/recipes/pb-yogurt-cup.jpg', sort_order: 10 },
  { id: '11', name: 'Quaker Rolled Oats', slug: 'quaker-rolled-oats', category: 'superfoods-nuts', size: '500g', price: 359, quantity: 15, protein: null, description: 'Quaker-brand rolled oats, stocked in our pantry.', image_url: '/images/product-quaker-oats.jpg', sort_order: 11 },
  { id: '12', name: 'Dried Blueberries', slug: 'dried-blueberries', category: 'dried-fruits', size: '75g', price: 239, quantity: 25, protein: null, description: 'Naturally dried, no added sugar.', image_url: '/images/recipes/ing-dried-blueberries.jpg', sort_order: 12 },
  { id: '13', name: 'Dried Strawberries', slug: 'dried-strawberries', category: 'dried-fruits', size: '75g', price: 159, quantity: 30, protein: null, description: 'Naturally dried, no added sugar.', image_url: '/images/recipes/ing-dried-strawberries.jpg', sort_order: 13 },
  { id: '14', name: 'Pitted Dates', slug: 'pitted-dates', category: 'dried-fruits', size: '75g', price: 99, quantity: 40, protein: null, description: 'Soft, pitted dates for snacking or baking.', image_url: '/images/recipes/ing-pitted-dates.jpg', sort_order: 14 },
  { id: '15', name: 'Shirataki Rice', slug: 'shirataki-rice', category: 'grains-plant-milk', size: '1kg', price: 249, quantity: 20, protein: null, description: 'Low-carb konjac rice.', image_url: '/images/product-shirataki-rice.jpg', sort_order: 15 },
  { id: '16', name: 'Oatside Oat Milk', slug: 'oatside-oat-milk', category: 'grains-plant-milk', size: '1L', price: 199, quantity: 30, protein: null, description: 'Creamy, plant-based oat milk.', image_url: '/images/recipes/ing-oat-milk.jpg', sort_order: 16 },
  { id: '17', name: 'Kirkland Almond Milk (Unsweetened)', slug: 'kirkland-almond-milk-unsweetened', category: 'grains-plant-milk', size: '1L', price: 179, quantity: 25, protein: null, description: 'Unsweetened almond milk.', image_url: '/images/product-almond-milk.jpg', sort_order: 17 },
  { id: '18', name: 'Overnight Oats (Glass Jar with Lid and Spoon)', slug: 'overnight-oats-glass-jar', category: 'breakfast-snacks', size: '350ml', price: 89, quantity: 20, protein: null, description: 'Reusable glass jar with lid and spoon, ready to fill.', image_url: '/images/story-ready-for-delivery.jpg', sort_order: 18 },
  { id: '19', name: 'Nestea Cleanse (Per Box of 10)', slug: 'nestea-cleanse-box-of-10', category: 'breakfast-snacks', size: '1 box', price: 169, quantity: 15, protein: null, description: 'High fiber cleanse tea, box of 10.', image_url: '/images/product-nestea-cleanse.jpg', sort_order: 19 },
  { id: '20', name: 'Homemade Overnight Oats (Banana)', slug: 'homemade-overnight-oats-banana', category: 'breakfast-snacks', size: '200ml', price: 129, quantity: 18, protein: null, description: 'Ready-to-eat overnight oats with banana.', image_url: '/images/hero-yogurt-bowl.jpg', sort_order: 20 },
  { id: '21', name: 'Homemade Overnight Oats (Mango)', slug: 'homemade-overnight-oats-mango', category: 'breakfast-snacks', size: '200ml', price: 139, quantity: 0, protein: null, description: 'Ready-to-eat overnight oats with mango.', image_url: '/images/product-oats-mango.jpg', sort_order: 21 },
  { id: '22', name: 'Wild Honey', slug: 'wild-honey', category: 'sweeteners', size: '330g', price: 199, quantity: 22, protein: null, description: 'Raw, unfiltered wild honey.', image_url: '/images/recipes/ing-wild-honey.jpg', sort_order: 22 },
  { id: '23', name: 'Monkfruit Sweetener', slug: 'monkfruit-sweetener', category: 'sweeteners', size: '100g', price: 149, quantity: 28, protein: null, description: 'Zero-calorie natural sweetener.', image_url: '/images/recipes/ing-monkfruit.jpg', sort_order: 23 },
  { id: '24', name: 'Fresh Lettuce', slug: 'fresh-lettuce', category: 'fresh-produce', size: 'per cup', price: 59, quantity: 12, protein: null, description: 'Fresh, crisp lettuce by the cup.', image_url: '🥬', sort_order: 24 },
]

-- Healthy Choices CMS schema
-- Run this once in the Supabase SQL Editor (Project → SQL Editor → New query → paste → Run).

create extension if not exists pgcrypto;

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null default 'dairy-probiotics',
  size text,
  price numeric not null,
  quantity integer not null default 0,
  protein integer,
  description text,
  image_url text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
-- Stock status is derived from quantity (quantity = 0 → out of stock),
-- not stored separately, so it can never drift out of sync.

-- ============================================================
-- RECIPES
-- ============================================================
create table if not exists recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  image_url text not null,
  time_label text,
  servings_label text,
  description text,
  ingredients jsonb not null default '[]'::jsonb,
  steps jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- PROMOTIONS (site-wide announcement banner)
-- ============================================================
create table if not exists promotions (
  id uuid primary key default gen_random_uuid(),
  message text not null,
  link_url text,
  link_label text,
  is_active boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- SITE CONTENT (flexible key/value JSON blocks — About page, etc.)
-- ============================================================
create table if not exists site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ============================================================
-- ADMIN USERS (allow-list of who can access /admin)
-- ============================================================
create table if not exists admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table products enable row level security;
alter table recipes enable row level security;
alter table promotions enable row level security;
alter table site_content enable row level security;
alter table admin_users enable row level security;

-- Public (anonymous) read access — these back public pages
create policy "Public can view products" on products for select using (true);
create policy "Public can view recipes" on recipes for select using (true);
create policy "Public can view promotions" on promotions for select using (true);
create policy "Public can view site content" on site_content for select using (true);

-- Admin-only writes (must exist in admin_users to insert/update/delete)
create policy "Admins can manage products" on products for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()))
  with check (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins can manage recipes" on recipes for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()))
  with check (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins can manage promotions" on promotions for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()))
  with check (exists (select 1 from admin_users where admin_users.id = auth.uid()));

create policy "Admins can manage site content" on site_content for all
  using (exists (select 1 from admin_users where admin_users.id = auth.uid()))
  with check (exists (select 1 from admin_users where admin_users.id = auth.uid()));

-- A user may check their own admin membership (needed for the client-side gate)
create policy "Users can check their own admin status" on admin_users for select
  using (auth.uid() = id);

-- ============================================================
-- SEED DATA — matches what's already live, so nothing changes
-- visually until an admin edits something.
-- ============================================================
insert into products (name, slug, category, size, price, quantity, protein, description, image_url, sort_order) values
  ('CULTUR’D Classic Greek Yogurt', 'culturd-classic-greek-yogurt', 'dairy-probiotics', '450ml', 199, 40, 15, 'Pure, unsweetened Greek yogurt with no fillers.', '/images/product-classic-greek-yogurt.jpg', 1),
  ('CULTUR’D High Protein Greek Yogurt', 'culturd-high-protein-greek-yogurt', 'dairy-probiotics', '450ml', 399, 25, 20, 'Extra-thick and strained for maximum protein per spoonful.', '/images/product-high-protein-yogurt.jpg', 2),
  ('CULTUR’D Probiotic Drink', 'culturd-probiotic-drink', 'dairy-probiotics', '450ml', 169, 30, null, 'A drinkable dose of live active cultures for your gut.', '/images/product-probiotic-drink.jpg', 3),
  ('Chia Seeds', 'chia-seeds', 'superfoods-nuts', '50g', 79, 50, null, 'Organic chia seeds, packed with fiber and omega-3s.', '/images/recipes/ing-chia-seeds.jpg', 4),
  ('Walnuts', 'walnuts', 'superfoods-nuts', '50g', 109, 45, null, 'Crunchy, heart-healthy walnuts.', '/images/recipes/ing-walnuts.jpg', 5),
  ('Pumpkin Seeds', 'pumpkin-seeds', 'superfoods-nuts', '50g', 79, 40, null, 'Roasted pumpkin seeds for topping bowls or snacking.', '/images/recipes/ing-pumpkin-seeds.jpg', 6),
  ('Sliced Almonds', 'sliced-almonds', 'superfoods-nuts', '50g', 109, 35, null, 'Blanched, sliced almonds.', '/images/recipes/ing-sliced-almonds.jpg', 7),
  ('Rolled Oats', 'rolled-oats', 'superfoods-nuts', '250g', 119, 60, null, 'Whole grain rolled oats for overnight oats and baking.', '/images/recipes/overnight-oats.jpg', 8),
  ('Roasted Cashew Splits', 'roasted-cashew-splits', 'superfoods-nuts', '50g', 89, 0, null, 'Roasted cashew pieces.', '/images/recipes/trail-mix-bites.jpg', 9),
  ('Keto Peanut Butter', 'keto-peanut-butter', 'superfoods-nuts', '500g', 299, 20, null, 'Low-carb, no-sugar-added peanut butter.', '/images/recipes/pb-yogurt-cup.jpg', 10),
  ('Quaker Rolled Oats', 'quaker-rolled-oats', 'superfoods-nuts', '500g', 359, 15, null, 'Quaker-brand rolled oats, stocked in our pantry.', '/images/product-quaker-oats.jpg', 11),
  ('Dried Blueberries', 'dried-blueberries', 'dried-fruits', '75g', 239, 25, null, 'Naturally dried, no added sugar.', '/images/recipes/ing-dried-blueberries.jpg', 12),
  ('Dried Strawberries', 'dried-strawberries', 'dried-fruits', '75g', 159, 30, null, 'Naturally dried, no added sugar.', '/images/recipes/ing-dried-strawberries.jpg', 13),
  ('Pitted Dates', 'pitted-dates', 'dried-fruits', '75g', 99, 40, null, 'Soft, pitted dates for snacking or baking.', '/images/recipes/ing-pitted-dates.jpg', 14),
  ('Shirataki Rice', 'shirataki-rice', 'grains-plant-milk', '1kg', 249, 20, null, 'Low-carb konjac rice.', '/images/product-shirataki-rice.jpg', 15),
  ('Oatside Oat Milk', 'oatside-oat-milk', 'grains-plant-milk', '1L', 199, 30, null, 'Creamy, plant-based oat milk.', '/images/recipes/ing-oat-milk.jpg', 16),
  ('Kirkland Almond Milk (Unsweetened)', 'kirkland-almond-milk-unsweetened', 'grains-plant-milk', '1L', 179, 25, null, 'Unsweetened almond milk.', '/images/product-almond-milk.jpg', 17),
  ('Overnight Oats (Glass Jar with Lid and Spoon)', 'overnight-oats-glass-jar', 'breakfast-snacks', '350ml', 89, 20, null, 'Reusable glass jar with lid and spoon, ready to fill.', '/images/story-ready-for-delivery.jpg', 18),
  ('Nestea Cleanse (Per Box of 10)', 'nestea-cleanse-box-of-10', 'breakfast-snacks', '1 box', 169, 15, null, 'High fiber cleanse tea, box of 10.', '/images/product-nestea-cleanse.jpg', 19),
  ('Homemade Overnight Oats (Banana)', 'homemade-overnight-oats-banana', 'breakfast-snacks', '200ml', 129, 18, null, 'Ready-to-eat overnight oats with banana.', '/images/hero-yogurt-bowl.jpg', 20),
  ('Homemade Overnight Oats (Mango)', 'homemade-overnight-oats-mango', 'breakfast-snacks', '200ml', 139, 0, null, 'Ready-to-eat overnight oats with mango.', '/images/product-oats-mango.jpg', 21),
  ('Wild Honey', 'wild-honey', 'sweeteners', '330g', 199, 22, null, 'Raw, unfiltered wild honey.', '/images/recipes/ing-wild-honey.jpg', 22),
  ('Monkfruit Sweetener', 'monkfruit-sweetener', 'sweeteners', '100g', 149, 28, null, 'Zero-calorie natural sweetener.', '/images/recipes/ing-monkfruit.jpg', 23),
  ('Fresh Lettuce', 'fresh-lettuce', 'fresh-produce', 'per cup', 59, 12, null, 'Fresh, crisp lettuce by the cup.', '🥬', 24)
on conflict (slug) do nothing;

insert into recipes (title, slug, image_url, time_label, servings_label, description, ingredients, steps, sort_order) values
(
  'Protein-Packed Overnight Oats',
  'protein-packed-overnight-oats',
  '/images/recipes/overnight-oats.jpg',
  '5 min prep · overnight',
  '1 jar',
  'A make-ahead breakfast that keeps you full all morning. Layer it the night before and grab it on your way out the door.',
  '[{"label":"Rolled oats","image":"/images/recipes/overnight-oats.jpg"},{"label":"Chia seeds","image":"/images/recipes/ing-chia-seeds.jpg"},{"label":"Oat milk","image":"/images/recipes/ing-oat-milk.jpg"},{"label":"CULTUR’D Greek yogurt","image":"/images/product-classic-greek-yogurt.jpg"}]'::jsonb,
  '["Combine rolled oats, chia seeds, and oat milk in a jar.","Stir in a spoonful of CULTUR’D Greek yogurt for extra protein and creaminess.","Cover and refrigerate overnight (at least 6 hours).","Top with your favorite fruit before serving."]'::jsonb,
  1
),
(
  'Loaded CULTUR’D Yogurt Bowl',
  'loaded-culturd-yogurt-bowl',
  '/images/recipes/loaded-yogurt-bowl.jpg',
  '5 min',
  '1 bowl',
  'Our signature Thick and Strained Greek yogurt, dressed up with dried fruit, walnuts, and a drizzle of wild honey.',
  '[{"label":"CULTUR’D Greek yogurt","image":"/images/recipes/loaded-yogurt-bowl.jpg"},{"label":"Dried blueberries","image":"/images/recipes/ing-dried-blueberries.jpg"},{"label":"Dried strawberries","image":"/images/recipes/ing-dried-strawberries.jpg"},{"label":"Walnuts","image":"/images/recipes/ing-walnuts.jpg"},{"label":"Wild honey","image":"/images/recipes/ing-wild-honey.jpg"}]'::jsonb,
  '["Spoon CULTUR’D Greek yogurt into a bowl.","Top with dried blueberries, dried strawberries, and walnuts.","Finish with a generous drizzle of wild honey."]'::jsonb,
  2
),
(
  'No-Bake Trail Mix Bites',
  'no-bake-trail-mix-bites',
  '/images/recipes/trail-mix-bites.jpg',
  '15 min',
  '12 bites',
  'A grab-and-go snack for busy days — naturally sweetened and packed with nuts and seeds.',
  '[{"label":"Cashews","image":"/images/recipes/trail-mix-bites.jpg"},{"label":"Pumpkin seeds","image":"/images/recipes/ing-pumpkin-seeds.jpg"},{"label":"Sliced almonds","image":"/images/recipes/ing-sliced-almonds.jpg"},{"label":"Pitted dates","image":"/images/recipes/ing-pitted-dates.jpg"},{"label":"Monk fruit sweetener","image":"/images/recipes/ing-monkfruit.jpg"}]'::jsonb,
  '["Pulse pitted dates in a food processor until they form a sticky paste.","Fold in chopped cashews, pumpkin seeds, and sliced almonds.","Sweeten to taste with monk fruit sweetener.","Roll into bite-sized balls and refrigerate for at least 30 minutes."]'::jsonb,
  3
),
(
  'Keto Peanut Butter Yogurt Cup',
  'keto-peanut-butter-yogurt-cup',
  '/images/recipes/pb-yogurt-cup.jpg',
  '5 min',
  '1 cup',
  'A high-protein, low-sugar treat for anyone watching their carbs without giving up dessert.',
  '[{"label":"CULTUR’D Greek yogurt","image":"/images/product-classic-greek-yogurt.jpg"},{"label":"Keto peanut butter","image":"/images/recipes/pb-yogurt-cup.jpg"},{"label":"Chia seeds","image":"/images/recipes/ing-chia-seeds.jpg"},{"label":"Monk fruit sweetener","image":"/images/recipes/ing-monkfruit.jpg"}]'::jsonb,
  '["Spoon CULTUR’D Greek yogurt into a cup.","Swirl in keto peanut butter and a pinch of monk fruit sweetener.","Sprinkle chia seeds on top and serve chilled."]'::jsonb,
  4
)
on conflict (slug) do nothing;

insert into promotions (message, link_url, link_label, is_active)
values ('🎉 Free delivery on orders over ₱500 this week!', '/shop', 'Shop Now', false)
on conflict do nothing;

insert into site_content (key, value) values (
  'about',
  '{
    "heading": "Our Story",
    "subheading": "Crafting wellness, one spoonful at a time — homemade in Naga, Cebu.",
    "missionTitle": "Our Mission",
    "missionParagraphs": [
      "Healthy Choices started as a one-stop pantry for organic, natural, and wellness essentials — and grew around a simple idea: bring premium, homemade Greek yogurt to every table, made with real ingredients and no shortcuts.",
      "Every tub of CULTUR’D Greek yogurt is handcrafted in small batches, pure and unsweetened with no fillers. We’re not just making yogurt — we’re showing up, jar by jar, for your health."
    ],
    "address": "Casa Mira South, Langtad, City of Naga, Cebu",
    "hours": "Open daily, 7:00 AM – 11:00 AM · Daily pick-ups available"
  }'::jsonb
) on conflict (key) do nothing;

-- ============================================================
-- MAKE YOURSELF AN ADMIN
-- After you sign up for an account at /signup using the email
-- you want to use as admin, come back and run:
--
--   insert into admin_users (id, email)
--   select id, email from auth.users where email = 'you@example.com';
-- ============================================================

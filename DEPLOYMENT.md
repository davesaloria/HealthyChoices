# Development Setup Guide

## Prerequisites

- Node.js 18+
- Git
- GitHub account
- Vercel account
- Supabase account

## Local Development

### 1. Clone the Repository

```bash
git clone https://github.com/davesaloria/HealthyChoices.git
cd HealthyChoices
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in your `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## GitHub Setup

### Create Repository

The repository `davesaloria/HealthyChoices` is already created on your GitHub account.

### Push Your Code

```bash
git init
git add .
git commit -m "Initial commit: Healthy Choices ecommerce website"
git branch -M main
git remote add origin https://github.com/davesaloria/HealthyChoices.git
git push -u origin main
```

## Vercel Deployment

### 1. Connect GitHub to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Import Project"
4. Select your repository

### 2. Configure Project

- **Project name**: healthy-choices
- **Framework**: Next.js
- **Root directory**: ./

### 3. Add Environment Variables

In Vercel project settings, add:

```
NEXT_PUBLIC_SUPABASE_URL = your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-anon-key
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key
```

### 4. Deploy

Click "Deploy" and wait for deployment to complete.

Your site will be live at: `https://healthy-choices.vercel.app`

## Supabase Setup

### 1. Create Tables

Run these queries in Supabase SQL editor:

#### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  image_url TEXT,
  category_id UUID,
  protein DECIMAL,
  calories DECIMAL,
  carbs DECIMAL,
  fat DECIMAL,
  sugar DECIMAL,
  probiotics TEXT,
  ingredients TEXT[],
  available_sizes TEXT[],
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users NOT NULL,
  status TEXT DEFAULT 'pending',
  total_price DECIMAL NOT NULL,
  delivery_type TEXT NOT NULL,
  delivery_address TEXT,
  scheduled_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 2. Enable Row Level Security (RLS)

```sql
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Public can view products" ON products
  FOR SELECT USING (true);

-- Allow users to view their own orders
CREATE POLICY "Users can view their orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);
```

## Database Seeding

Add initial product data to Supabase via the dashboard or use the seed script.

## Testing

```bash
npm run type-check  # Type checking
npm run lint        # Linting
```

## Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Supabase Connection Issues
- Verify environment variables are correct
- Check Supabase project is active
- Ensure RLS policies are configured

### Vercel Deployment Issues
- Check build logs in Vercel dashboard
- Verify environment variables are set
- Ensure Node.js version is compatible

### Port Already in Use
```bash
# Kill process on port 3000
npx kill-port 3000
```

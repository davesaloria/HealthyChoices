# Healthy Choices — Premium Ecommerce Website

A modern, premium ecommerce website for Healthy Choices, a Greek yogurt brand. Built with Next.js 15, React, TypeScript, TailwindCSS, Supabase, and Framer Motion.

## 🌟 Features

- **Modern Design System**: Premium, minimalist aesthetic inspired by brands like Oatly and Chobani
- **Responsive Design**: Mobile-first approach with full desktop support
- **Product Showcase**: Detailed product pages with nutrition info, reviews, and recommendations
- **Shopping Cart**: Full cart management with persistent storage
- **Checkout Flow**: Multi-step checkout with delivery options
- **Admin Dashboard**: Manage products, orders, inventory, and content
- **Authentication**: Supabase Auth for secure user accounts
- **Database**: Supabase PostgreSQL with RLS policies
- **Animations**: Smooth transitions and micro-interactions with Framer Motion
- **SEO & GEO Optimized**: Metadata, structured data, sitemap, and robots.txt
- **Performance**: 95+ Lighthouse score target with image optimization
- **Accessibility**: WCAG AA compliance with proper focus states

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **Components**: shadcn/ui base components
- **Animations**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Deployment**: Vercel

## 📁 Project Structure

```
healthy-choices/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles
│   │   ├── (shop)/
│   │   │   ├── shop/           # Shop listing
│   │   │   ├── product/[id]/   # Product detail
│   │   │   ├── cart/           # Shopping cart
│   │   │   └── checkout/       # Checkout flow
│   │   ├── (info)/
│   │   │   ├── about/          # About page
│   │   │   ├── contact/        # Contact page
│   │   │   └── faq/            # FAQ page
│   │   ├── (auth)/
│   │   │   ├── login/          # Login page
│   │   │   ├── signup/         # Signup page
│   │   │   └── account/        # Account dashboard
│   │   ├── admin/              # Admin dashboard
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── ui/                 # Base UI components
│   │   ├── Header.tsx          # Header navigation
│   │   ├── Footer.tsx          # Footer
│   │   ├── HeroSection.tsx     # Hero section
│   │   └── ...
│   ├── lib/
│   │   ├── supabase/           # Supabase clients
│   │   ├── utils.ts            # Utility functions
│   │   └── ...
│   ├── types/                  # TypeScript types
│   ├── hooks/                  # Custom React hooks
│   └── providers/              # Context providers
├── public/                     # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/davesaloria/HealthyChoices.git
   cd HealthyChoices
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Database Setup

The Supabase database schema includes:

- **users** — User accounts and profiles
- **products** — Product catalog
- **categories** — Product categories
- **orders** — Order records
- **order_items** — Order line items
- **addresses** — Delivery addresses
- **coupons** — Discount codes
- **reviews** — Product reviews
- **inventory** — Stock management
- **images** — Product images
- **featured_products** — Homepage featured items
- **hero_banners** — Homepage banners
- **blog_posts** — Blog content
- **recipes** — Recipe content
- **settings** — App settings
- **admin_users** — Admin accounts
- **audit_logs** — Change tracking

## 🎨 Design System

### Color Palette
- **Primary Green**: #5F8F4E — Brand color for CTAs and highlights
- **Sage**: #DDE8D7 — Soft, natural accent
- **Cream**: #F7F2E8 — Warm background
- **Charcoal**: #2E2E2E — Text and dark elements
- **Coral**: #F28C5C — Accent for energy

### Typography
- **Display Font**: Sora (headings)
- **Body Font**: Inter (paragraphs and UI)

### Spacing System
- Base unit: 4px
- Scale: 8, 12, 16, 24, 32, 48, 64

## 📱 Pages

### Public Pages
- **Home** (`/`) — Hero, featured products, benefits, CTA
- **Shop** (`/shop`) — Product listing with filters
- **Product** (`/product/[id]`) — Detailed product view
- **Cart** (`/cart`) — Shopping cart management
- **Checkout** (`/checkout`) — Multi-step checkout
- **About** (`/about`) — Brand story and values
- **Contact** (`/contact`) — Contact form
- **FAQ** (`/faq`) — Frequently asked questions

### Auth Pages
- **Login** (`/login`) — User login
- **Signup** (`/signup`) — User registration
- **Account** (`/account`) — User dashboard

### Admin Pages
- **Dashboard** (`/admin`) — Overview and analytics
- **Products** (`/admin/products`) — Manage products
- **Orders** (`/admin/orders`) — View and manage orders
- **Customers** (`/admin/customers`) — Customer management
- **Settings** (`/admin/settings`) — App configuration

## 🔐 Authentication

Uses Supabase Auth with email/password authentication. Features:
- User signup and login
- Email verification
- Password reset
- Session management
- Protected routes

## 💳 Payment

Payment integration ready for Stripe. Currently configured for:
- Card payments
- UPI
- Net Banking

To enable Stripe:
1. Set up Stripe account
2. Add credentials to `.env.local`
3. Implement payment endpoint in `/api/checkout`

## 🧪 Testing

```bash
# Run tests
npm test

# Run type checking
npm run type-check

# Run linting
npm run lint
```

## 📊 Analytics

Configure analytics with environment variables. Currently set up for:
- Google Analytics (GA4)
- Vercel Analytics

## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables

3. **Deploy**
   - Vercel automatically deploys on push to main branch

### Environment Variables (Production)
Add these to Vercel project settings:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` (if using Stripe)

## 🔄 Continuous Integration

GitHub Actions workflows (optional):
- Linting
- Type checking
- Build verification
- Automated testing

## 📈 Performance

Target metrics:
- Lighthouse Performance: 95+
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1

Optimization techniques:
- Image optimization with Next.js Image
- Code splitting and lazy loading
- Minification and compression
- Caching strategies

## 🔒 Security

- Row Level Security (RLS) in Supabase
- Environment variable protection
- Secure API routes with auth validation
- CSRF protection
- Content Security Policy headers

## 📝 Documentation

- [Brand Vision](./Obsidian%20Docs/01%20Brand%20Vision.md)
- [UX Strategy](./Obsidian%20Docs/02%20UX%20Strategy.md)
- [Information Architecture](./Obsidian%20Docs/03%20Information%20Architecture.md)
- [Design System](./Obsidian%20Docs/06%20Design%20System.md)

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is proprietary. All rights reserved.

## 👋 Support

For support, email hello@healthychoices.com or visit our contact page.

---

Built with ❤️ by Healthy Choices

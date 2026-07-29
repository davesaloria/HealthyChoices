# Healthy Choices — Quick Start

A fully functional ecommerce website for Healthy Choices Greek yogurt brand.

## ✨ What's Included

- ✅ **Home Page** — Hero, featured products, benefits, CTA
- ✅ **Shop Page** — Product listing with filtering
- ✅ **Product Pages** — Detailed view with nutrition and reviews
- ✅ **Shopping Cart** — Cart management and persistence
- ✅ **Checkout** — Multi-step checkout flow
- ✅ **Auth Pages** — Login and signup
- ✅ **User Account** — Order history and profile
- ✅ **Info Pages** — About, Contact, FAQ
- ✅ **Design System** — Premium color palette and typography
- ✅ **Responsive** — Mobile-first design
- ✅ **Animations** — Smooth transitions with Framer Motion
- ✅ **SEO** — Metadata, sitemap, robots.txt

## 🚀 Get Started

### 1. Setup

```bash
npm install
cp .env.example .env.local
# Add your Supabase credentials
```

### 2. Run

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### 3. Deploy

Push to GitHub and connect to Vercel:

```bash
git push origin main
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 📱 Pages

| Page | Path | Status |
|------|------|--------|
| Home | `/` | ✅ |
| Shop | `/shop` | ✅ |
| Product | `/product/[id]` | ✅ |
| Cart | `/cart` | ✅ |
| Checkout | `/checkout` | ✅ |
| Login | `/login` | ✅ |
| Signup | `/signup` | ✅ |
| Account | `/account` | ✅ |
| About | `/about` | ✅ |
| Contact | `/contact` | ✅ |
| FAQ | `/faq` | ✅ |

## 🎨 Design

- **Colors**: Green, sage, cream, charcoal, coral
- **Typography**: Sora (display) + Inter (body)
- **Components**: Buttons, cards, forms, modals
- **Animation**: Smooth page transitions and interactions

## 🔧 Tech Stack

- Next.js 15
- React 18
- TypeScript
- TailwindCSS
- Framer Motion
- Supabase
- Zustand

## 📚 Documentation

- [Brand Vision](./Obsidian%20Docs/01%20Brand%20Vision.md)
- [UX Strategy](./Obsidian%20Docs/02%20UX%20Strategy.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Main README](./README.md)

## 🚢 Ready to Deploy

Everything is configured and ready to deploy to Vercel with Supabase as the backend.

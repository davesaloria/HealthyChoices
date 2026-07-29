# 10 Database Schema

## Core Tables
- users
- products
- categories
- orders
- order_items
- addresses
- coupons
- reviews
- inventory
- images
- featured_products
- hero_banners
- blog_posts
- recipes
- settings
- admin_users
- audit_logs

## Relationships
- products belong to categories
- order_items belong to orders and products
- addresses belong to users
- reviews belong to users and products
- images belong to products or banners
- featured_products reference products
- hero_banners can be linked to campaigns or pages

## Security
- Row Level Security for users, orders, and admin data
- Admin-only access for management tables
- Audit logging for change-sensitive actions

## Migration Strategy
- Use versioned migrations
- Separate schema, seed, and policies
- Keep production-safe defaults

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export const API_ENDPOINTS = {
  products: '/api/products',
  orders: '/api/orders',
  cart: '/api/cart',
  auth: '/api/auth',
  checkout: '/api/checkout',
}

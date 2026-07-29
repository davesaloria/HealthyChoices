// Product types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  category_id: string
  protein: number
  calories: number
  carbs: number
  fat: number
  sugar: number
  probiotics?: string
  ingredients: string[]
  available_sizes: string[]
  in_stock: boolean
  created_at: string
  updated_at: string
}

// Cart types
export interface CartItem {
  id: string
  product_id: string
  quantity: number
  size: string
}

// Order types
export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered'
  total_price: number
  delivery_type: 'pickup' | 'delivery'
  delivery_address?: string
  scheduled_time: string
  created_at: string
  updated_at: string
}

// User types
export interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  created_at: string
}

// Review types
export interface Review {
  id: string
  product_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
}

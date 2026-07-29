import { type StateCreator, create } from 'zustand'

interface CartItem {
  id: string
  productId: string
  quantity: number
  size: string
  price: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
}

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === item.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        }
      }
      return { items: [...state.items, item] }
    }),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    })),
  clearCart: () => set({ items: [] }),
  getTotal: () => {
    const state = get()
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
  },
}))

export default useCartStore

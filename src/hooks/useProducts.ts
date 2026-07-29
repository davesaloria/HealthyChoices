// Custom hook for fetching products
'use client'

import { useQuery } from '@tanstack/react-query'
import apiClient from '@/lib/api-client'
import type { Product } from '@/types'

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await apiClient.get<Product[]>('/api/products')
      return data
    },
  })
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await apiClient.get<Product>(`/api/products/${id}`)
      return data
    },
    enabled: !!id,
  })
}

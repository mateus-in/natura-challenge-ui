import { useQuery } from '@tanstack/react-query'

import { ProductsResponse } from '../interfaces'
import { fetchProducts } from '../services'

export function useProducts(
  skip: number,
  take: number,
  departmentId?: string,
  categoryId?: string,
) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', skip, take, departmentId, categoryId],
    queryFn: () => fetchProducts(skip, take, departmentId, categoryId),
  })
}

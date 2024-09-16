import { useQuery } from '@tanstack/react-query'

import { Category } from '../interfaces'
import { fetchCategories } from '../services'

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })
}

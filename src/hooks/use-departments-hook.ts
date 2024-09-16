import { useQuery } from '@tanstack/react-query'

import { Department } from '../interfaces'
import { fetchDepartments } from '../services'

export function useDepartments() {
  return useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  })
}

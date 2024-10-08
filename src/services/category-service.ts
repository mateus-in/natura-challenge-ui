import { Category } from '../interfaces'
import { api } from '../lib'

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get('/categories', {
    params: {
      skip: 0,
      take: 23,
    },
  })

  return data.categories
}

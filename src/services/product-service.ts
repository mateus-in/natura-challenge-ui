import { Pagination, Product } from '../interfaces'
import { api } from '../lib'

interface Params {
  skip: number
  take: number
  departmentId?: string
  categoryId?: string
}

interface Response {
  products: Product[]
  pagination: Pagination
}

export async function fetchProducts(params: Params): Promise<Response> {
  const { skip, take, departmentId, categoryId } = params

  const { data } = await api.get('/products', {
    params: {
      skip,
      take,
      departmentId,
      categoryId,
    },
  })

  return data
}

import { ProductsResponse } from '../interfaces'
import { api } from '../libs'

export async function fetchProducts(
  skip: number,
  take: number,
  departmentId?: string,
  categoryId?: string,
): Promise<ProductsResponse> {
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

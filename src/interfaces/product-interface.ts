export interface Product {
  id: string
  name: string
  description: string
  price: number
  stockQuantity: number
}

export interface Pagination {
  count: number
  limit: number
  currentPage: number
  pagesCount: number
}

export interface ProductsResponse {
  products: Product[]
  pagination: Pagination
}

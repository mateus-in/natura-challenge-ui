import { useContext } from 'react'

import { ProductsContext } from '../contexts'

export function useProductsContext() {
  const context = useContext(ProductsContext)

  if (!context) {
    throw new Error('useProductsContext must be used within a ProductProvider')
  }

  return context
}

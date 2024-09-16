import { useState } from 'react'

import { ProductsFilter, ProductsList, ProductsPagination } from '../components'
import { ProductsContext } from '../contexts'
import { useCategories, useDepartments, useProducts } from '../hooks'
import { Product } from '../interfaces'

export function Home() {
  const [page, setPage] = useState(1)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | undefined
  >(undefined)
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined)

  const itemsPerPage = 15
  const skip = (page - 1) * itemsPerPage

  const {
    data: departments,
    isLoading: isLoadingDepartments,
    error: errorDepartments,
  } = useDepartments()

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategories()

  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useProducts(skip, itemsPerPage, selectedDepartmentId, selectedCategoryId)

  const isLoading =
    isLoadingProducts || isLoadingCategories || isLoadingDepartments
  const error =
    errorProducts?.message ||
    errorCategories?.message ||
    errorDepartments?.message ||
    null
  const products = productsResponse?.products || []
  const totalPages = productsResponse?.pagination.pagesCount || 1

  const handleNextPage = () => {
    if (productsResponse?.pagination && page < totalPages) {
      setPage((prev) => prev + 1)
    }
  }

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 1))
  }

  const handleDepartmentClick = (departmentId: string) => {
    setSelectedDepartmentId(
      selectedDepartmentId === departmentId ? undefined : departmentId,
    )
    setSelectedCategoryId(undefined)
    setPage(1)
  }

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(
      selectedCategoryId === categoryId ? undefined : categoryId,
    )
    setSelectedDepartmentId(undefined)
    setPage(1)
  }

  const addToCart = (product: Product) => {
    console.log(`Produto adicionado ao carrinho: ${product.name}`)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        categories: categories || [],
        departments: departments || [],
        selectedDepartmentId,
        selectedCategoryId,
        currentPage: page,
        totalPages,
        isLoading,
        error,
        handleDepartmentClick,
        handleCategoryClick,
        handleNextPage,
        handlePreviousPage,
        addToCart,
      }}
    >
      <div className="flex flex-col md:flex-row p-4 gap-4">
        <ProductsFilter />
        <main className="flex-1 p-4 rounded">
          <h1 className="text-3xl font-bold mb-4">Produtos</h1>
          <ProductsList />
          <ProductsPagination />
        </main>
      </div>
    </ProductsContext.Provider>
  )
}

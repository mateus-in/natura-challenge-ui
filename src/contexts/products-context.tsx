import { createContext, ReactNode, useState } from 'react'

import { useCategories, useDepartments, useProducts } from '../hooks'
import { Category, Department, Product } from '../interfaces'

interface ProductsContextProps {
  departments: Department[]
  categories: Category[]
  products: Product[]
  selectedDepartmentId?: string
  selectedCategoryId?: string
  currentPage: number
  totalPages: number
  isLoading: boolean
  error: string | null
  handleDepartmentClick: (departmentId: string) => void
  handleCategoryClick: (categoryId: string) => void
  handleNextPage: () => void
  handlePreviousPage: () => void
  addToCart: (product: Product) => void
}

interface ProductsProviderProps {
  children: ReactNode
}

export const ProductsContext = createContext<ProductsContextProps>(
  {} as ProductsContextProps,
)

export function ProductsProvider({ children }: ProductsProviderProps) {
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
    data: productsData,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useProducts(skip, itemsPerPage, selectedDepartmentId, selectedCategoryId)

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useCategories()

  const {
    data: departments,
    isLoading: isLoadingDepartments,
    error: errorDepartments,
  } = useDepartments()

  const isLoading =
    isLoadingProducts || isLoadingCategories || isLoadingDepartments
  const error =
    errorProducts?.message ||
    errorCategories?.message ||
    errorDepartments?.message ||
    null
  const products = productsData?.products || []
  const totalPages = productsData?.pagination.pagesCount || 1

  const handleNextPage = () => {
    if (productsData?.pagination && page < totalPages) {
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
      {children}
    </ProductsContext.Provider>
  )
}

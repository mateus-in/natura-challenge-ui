import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useAppContext } from '../hooks'
import { Category, Department, Pagination, Product } from '../interfaces'
import {
  addItemToCart,
  fetchCategories,
  fetchDepartments,
  fetchProducts,
} from '../services'

interface ProductsFilter {
  categoryId: string | undefined
  departmentId: string | undefined
}

export function useProductsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [productsFilter, setProductsFilter] = useState({} as ProductsFilter)

  const itemsPerPage = 15
  const skip = (currentPage - 1) * itemsPerPage

  const { user, setUser } = useAppContext()

  const {
    data: departments,
    isLoading: isLoadingDepartments,
    error: errorDepartments,
  } = useQuery<Department[]>({
    queryKey: ['departments'],
    queryFn: fetchDepartments,
  })

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery<{ products: Product[]; pagination: Pagination }>({
    queryKey: [
      'products',
      {
        skip,
        take: itemsPerPage,
        departmentId: productsFilter.departmentId,
        categoryId: productsFilter.categoryId,
      },
    ],
    queryFn: () =>
      fetchProducts({
        skip,
        take: itemsPerPage,
        departmentId: productsFilter.departmentId,
        categoryId: productsFilter.categoryId,
      }),
  })

  const isLoading =
    isLoadingProducts || isLoadingCategories || isLoadingDepartments

  const error =
    errorProducts?.message ||
    errorCategories?.message ||
    errorDepartments?.message ||
    null

  const products = productsResponse?.products || []
  const pagesCount = productsResponse?.pagination.pagesCount || 1

  const handleNextPage = () => {
    if (productsResponse?.pagination && currentPage < pagesCount) {
      setCurrentPage((page) => page + 1)
    }
  }

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1))
  }

  const handleSelectDepartment = (department: Department) => {
    setProductsFilter({
      departmentId: department.id,
      categoryId: undefined,
    })

    setCurrentPage(1)
  }

  const handleSelectCategory = (category: Category) => {
    setProductsFilter({
      categoryId: category.id,
      departmentId: undefined,
    })

    setCurrentPage(1)
  }

  const handleAddToCart = async (product: Product) => {
    if (!user) {
      return
    }

    const cart = await addItemToCart(user.cart.id, product.id, 1)

    setUser({
      ...user,
      cart,
    })
  }

  return {
    categories,
    currentPage,
    departments,
    error,
    handleAddToCart,
    handleNextPage,
    handlePreviousPage,
    handleSelectCategory,
    handleSelectDepartment,
    isLoading,
    pagesCount,
    products,
    productsFilter,
  }
}

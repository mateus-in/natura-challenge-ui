import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { api } from "../../libs/api";

interface Department {
  id: string;
  name: string;
  description: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  department: Department;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

interface Pagination {
  count: number;
  limit: number;
  currentPage: number;
  pagesCount: number;
}

interface ProductsResponse {
  products: Product[];
  pagination: Pagination;
}

const fetchDepartments = async (): Promise<Department[]> => {
  const { data } = await api.get("/departments", {
    params: {
      skip: 0,
      take: 100,
    },
  });

  return data.departments;
};

const fetchCategories = async (): Promise<Category[]> => {
  const { data } = await api.get("/categories", {
    params: {
      skip: 0,
      take: 200,
    },
  });

  return data.categories;
};

const fetchProducts = async (
  skip: number,
  take: number,
  departmentId?: string,
  categoryId?: string
): Promise<ProductsResponse> => {
  const { data } = await api.get("/products", {
    params: {
      skip,
      take,
      departmentId,
      categoryId,
    },
  });

  return data;
};

export function Home() {
  const itemsPerPage = 15;

  const [page, setPage] = useState(1);
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    string | undefined
  >(undefined);
  const [selectedCategoryId, setSelectedCategoryId] = useState<
    string | undefined
  >(undefined);

  const skip = (page - 1) * itemsPerPage;

  const {
    data: departments = [],
    isLoading: isLoadingDepartments,
    error: errorDepartments,
  } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: fetchDepartments,
  });

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data,
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery<ProductsResponse>({
    queryKey: [
      "products",
      skip,
      itemsPerPage,
      selectedDepartmentId,
      selectedCategoryId,
    ],
    queryFn: () =>
      fetchProducts(
        skip,
        itemsPerPage,
        selectedDepartmentId,
        selectedCategoryId
      ),
  });

  const products = data?.products || [];
  const pagination = data?.pagination;

  const totalPages = pagination ? pagination.pagesCount : 1;

  function addToCart(product: Product) {
    console.log(product);
  }

  function handleNextPage() {
    if (pagination && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }

  function handlePreviousPage() {
    setPage((prev) => Math.max(prev - 1, 1));
  }

  function handleSelectDepartment(departmentId: string) {
    if (selectedDepartmentId === departmentId) {
      setSelectedDepartmentId(undefined);
    } else {
      setSelectedDepartmentId(departmentId);
      setSelectedCategoryId(undefined);
    }
    setPage(1);
  }

  function handleSelectCategory(categoryId: string) {
    if (selectedCategoryId === categoryId) {
      setSelectedCategoryId(undefined);
    } else {
      setSelectedCategoryId(categoryId);
      setSelectedDepartmentId(undefined);
    }
    setPage(1);
  }

  if (isLoadingProducts || isLoadingCategories || isLoadingDepartments)
    return <span>Carregando...</span>;

  if (errorProducts || errorCategories || errorDepartments)
    return <span>Erro ao carregar dados.</span>;

  return (
    <div className="flex flex-col md:flex-row p-4 gap-4">
      <aside className="w-full md:w-1/4 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Departamentos</h2>
        <ul>
          {departments.map((department) => (
            <li
              key={department.id}
              className={`mb-2 cursor-pointer ${
                selectedDepartmentId === department.id ? 'font-bold text-blue-600' : ''
              }`}
              onClick={() => handleSelectDepartment(department.id)}
            >
              {department.name}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">Categorias</h2>
        <ul>
          {categories.map((category) => (
            <li
              key={category.id}
              className={`mb-2 cursor-pointer ${
                selectedCategoryId === category.id ? 'font-bold text-blue-600' : ''
              }`}
              onClick={() => handleSelectCategory(category.id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 rounded">
        <h1 className="text-3xl font-bold mb-4">Produtos</h1>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="border p-4 rounded shadow flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700 mb-2">{product.description}</p>
                <p className="text-lg font-semibold text-green-600 mb-4">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <button
                className="mt-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                onClick={() => addToCart(product)}
              >
                Adicionar ao Carrinho
              </button>
            </li>
          ))}
        </ul>

        {/* Componente de Paginação */}
        <div className="flex justify-between items-center mt-6">
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handlePreviousPage}
            disabled={page === 1}
          >
            Página Anterior
          </button>
          <span className="text-lg font-semibold">
            Página {pagination?.currentPage} de {totalPages}
          </span>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={handleNextPage}
            disabled={page === totalPages}
          >
            Próxima Página
          </button>
        </div>
      </main>
    </div>
  );
}

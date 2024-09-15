import { useQuery } from "@tanstack/react-query";

import { api } from "../../libs/api";

interface Department {
  id: number;
  name: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  department: Department;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
}

const fetchDepartments = async (): Promise<Department[]> => {
  const response = await api.get("/departments", {
    params: {
      skip: 0,
      take: 200
    }
  });

  return response.data.departments;
};

const fetchCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories", {
    params: {
      skip: 0,
      take: 200
    }
  });

  return response.data.categories;
};

const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get("/products", {
    params: {
      skip: 0,
      take: 200
    }
  });

  return response.data.products;
};

export function Home() {
  const {
    data: departments = [],
    isLoading: isLoadingDepartments,
    error: errorDepartments,
  } = useQuery<Department[]>({
    queryKey: ["departments"],
    queryFn: fetchDepartments
  });

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories
  });

  const {
    data: products = [],
    isLoading: isLoadingProducts,
    error: errorProducts,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoadingProducts || isLoadingCategories || isLoadingDepartments)
    return <span>Carregando...</span>;

  if (errorProducts || errorCategories || errorDepartments)
    return <span>Erro ao carregar dados.</span>;

  const data = {
    departments,
    categories,
    products,
  }

  return <p>{JSON.stringify(data)}</p>
};

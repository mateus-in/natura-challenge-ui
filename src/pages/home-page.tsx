import { Pagination } from '../components'
import { useProductsPage } from '../hooks'

export function Home() {
  const {
    categories,
    currentPage,
    departments,
    error,
    handleAddToCart,
    handleNextPage,
    handlePreviousPage,
    isLoading,
    pagesCount,
    handleSelectCategory,
    handleSelectDepartment,
    products,
    productsFilter,
  } = useProductsPage()

  if (isLoading) {
    return <span>Carregando...</span>
  }

  if (error) {
    return <span>Erro ao carregar os produtos</span>
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Filter */}
      <aside className="w-full md:w-1/4 p-4 rounded">
        <h2 className="text-xl font-bold mb-4">Departamentos</h2>
        <ul>
          {departments?.map((department) => (
            <li
              className={`mb-2 cursor-pointer ${productsFilter.departmentId === department.id ? 'font-bold text-blue-600' : ''}`}
              key={department.id}
              onClick={() => handleSelectDepartment(department)}
            >
              {department.name}
            </li>
          ))}
        </ul>

        <h2 className="text-xl font-bold mt-8 mb-4">Categorias</h2>
        <ul>
          {categories?.map((category) => (
            <li
              className={`mb-2 cursor-pointer ${productsFilter.categoryId === category.id ? 'font-bold text-blue-600' : ''}`}
              key={category.id}
              onClick={() => handleSelectCategory(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 p-4 rounded">
        <h1 className="text-3xl font-bold mb-4">Produtos</h1>

        {/* List */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length === 0
            ? 'Nenhum produto encontrado'
            : products.map((product) => (
                <li
                  className="border p-4 rounded shadow flex flex-col justify-between"
                  key={product.id}
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
                    onClick={() => handleAddToCart(product)}
                  >
                    Adicionar ao Carrinho
                  </button>
                </li>
              ))}
        </ul>

        {products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            pagesCount={pagesCount}
          />
        )}
      </main>
    </div>
  )
}

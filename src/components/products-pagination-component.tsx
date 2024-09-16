import { useProductsContext } from '../hooks'

export function ProductsPagination() {
  const { currentPage, totalPages, handleNextPage, handlePreviousPage } =
    useProductsContext()

  return (
    <div className="flex justify-between items-center mt-6">
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        Página Anterior
      </button>
      <span className="text-lg font-semibold">
        Página {currentPage} de {totalPages}
      </span>
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        Próxima Página
      </button>
    </div>
  )
}

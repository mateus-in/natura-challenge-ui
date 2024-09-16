import { useProductsContext } from '../hooks'

export function ProductsList() {
  const { products } = useProductsContext()

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
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
            onClick={() =>
              console.log(`Adicionar ao carrinho: ${product.name}`)
            }
          >
            Adicionar ao Carrinho
          </button>
        </li>
      ))}
    </ul>
  )
}

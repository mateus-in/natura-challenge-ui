import { Link } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <span className="text-2xl font-bold text-blue-600">
        natura-challenge-ui
      </span>

      <nav className="flex space-x-6">
        <a
          href="/"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Home
        </a>
        <a
          href="/orders"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Pedidos
        </a>
        <a
          href="/cart"
          className="text-gray-700 hover:text-blue-600 transition-colors"
        >
          Carrinho
        </a>
      </nav>

      <div>
        <Link to="/sign-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
            Entrar
          </button>
        </Link>
      </div>
    </header>
  )
}

import { NavLink } from 'react-router-dom'

export function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <span className="text-2xl font-bold text-blue-600">
        natura-challenge-ui
      </span>

      <nav className="flex space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold'
              : 'text-gray-700 hover:text-blue-600 transition-colors'
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold'
              : 'text-gray-700 hover:text-blue-600 transition-colors'
          }
        >
          Pedidos
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            isActive
              ? 'text-blue-600 font-bold'
              : 'text-gray-700 hover:text-blue-600 transition-colors'
          }
        >
          Carrinho
        </NavLink>
      </nav>

      <NavLink to="/sign-in">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
          Login
        </button>
      </NavLink>
    </header>
  )
}

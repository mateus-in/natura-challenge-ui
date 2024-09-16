import { Link } from 'react-router-dom'
import { useAppContext } from '../hooks'

export function Navbar() {
  const { setSignInIsVisible, user } = useAppContext()

  function handleOpenSignIn() {
    setSignInIsVisible(true)
  }

  return (
    <div className="flex justify-center bg-white shadow-md">
      <div className="w-full max-w-screen-xl">
        <header className="flex items-center justify-between p-4">
          <span className="text-2xl font-bold text-blue-600">
            natura-challenge-ui
          </span>

          {!user ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={handleOpenSignIn}
            >
              Entrar
            </button>
          ) : (
            <nav className="flex justify-between items-center p-4 gap-4">
              <ul className="flex space-x-4">
                <li>
                  <Link
                    to="/orders"
                    className="text-gray-800 hover:text-blue-500"
                  >
                    Pedidos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-gray-800 hover:text-blue-500"
                  >
                    {`Carrinho (${user.cart.items.length})`}
                  </Link>
                </li>
              </ul>

              <span className="text-gray-800 font-semibold">John Doe</span>
            </nav>
          )}
        </header>
      </div>
    </div>
  )
}

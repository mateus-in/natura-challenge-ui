import { useAppContext } from '../hooks'

export function Navbar() {
  const { setSignInIsVisible } = useAppContext()

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

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={handleOpenSignIn}
          >
            Entrar
          </button>
        </header>
      </div>
    </div>
  )
}

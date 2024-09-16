import { useAppContext } from '../hooks'
import { createOrder, removeItemToCart, updateItemQuantity } from '../services'

export function Cart() {
  const { user, setUser } = useAppContext()

  const removeItem = async (itemId: string) => {
    if (!user) {
      return
    }

    const cart = await removeItemToCart(user.cart.id, itemId)

    setUser({
      ...user,
      cart,
    })
  }

  const calculateTotal = () => {
    return (
      user?.cart.items
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toFixed(2) || '0.00'
    )
  }

  async function handleQuantityChange(id: string, arg1: number) {
    if (!user) {
      return
    }

    const cart = await updateItemQuantity(user.cart.id, id, arg1)

    setUser({
      ...user,
      cart,
    })
  }

  async function handleCheckout() {
    if (!user) {
      return
    }

    await createOrder(user.cart.id)
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Lista de Itens do Carrinho */}
      <main className="flex-1 p-4 rounded">
        <h1 className="text-2xl font-bold mb-6">Seu carrinho</h1>
        {user?.cart.items.length ? (
          <ul className="space-y-4">
            {user.cart.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center">
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold">
                      {item.product.name}
                    </h3>

                    <p className="text-lg font-bold mt-2">
                      R${item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                    className="border rounded p-1"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-500 hover:text-red-600"
                  >
                    &times;
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
        )}
      </main>

      {/* Resumo do Pedido */}
      <aside className="w-full md:w-1/3 bg-white shadow-md p-6 rounded">
        <h2 className="text-xl font-bold mb-4">Resumo</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Valor dos produtos</span>
            <span>R${calculateTotal()}</span>
          </div>
          <div className="flex justify-between">
            <span>Frete</span>
            <span>$R0.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax estimate</span>
            <span>R$0.00</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${(parseFloat(calculateTotal()) + 5 + 8.32).toFixed(2)}</span>
          </div>
        </div>
        <button
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
          onClick={handleCheckout}
          type="button"
        >
          Confirmar
        </button>
      </aside>
    </div>
  )
}

import { getToken } from '../helpers'
import { Cart } from '../interfaces'
import { api } from '../lib'

const token = getToken()

export async function addItemToCart(
  cartId: string,
  productId: string,
  quantity: number,
): Promise<Cart> {
  const response = await api.post(
    '/carts/add-item',
    {
      cartId,
      productId,
      quantity: Number(quantity),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

export async function clearCart(cartId: string): Promise<Cart> {
  const response = await api.put(
    '/carts/clear',
    {
      cartId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

export async function removeItemToCart(
  cartId: string,
  cartItemId: string,
): Promise<Cart> {
  const response = await api.put(
    '/carts/remove-item',
    {
      cartId,
      cartItemId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

export async function updateItemQuantity(
  cartId: string,
  cartItemId: string,
  quantity: number,
): Promise<Cart> {
  const response = await api.put(
    '/carts/update-item-quantity',
    {
      cartId,
      cartItemId,
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return response.data
}

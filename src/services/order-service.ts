import { getToken } from '../helpers'
import { Order } from '../interfaces'
import { api } from '../lib'

const token = getToken()

export async function createOrder(cartId: string): Promise<Order> {
  const response = await api.post(
    '/orders',
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

export async function getOrdersHistory() {
  const response = await api.get('/users/orders-history', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

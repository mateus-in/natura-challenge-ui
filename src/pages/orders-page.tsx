import { useQuery } from '@tanstack/react-query'
import { Order } from '../interfaces'
import { getOrdersHistory } from '../services'

export function Orders() {
  const {
    data: orders,
    isLoading,
    error,
  } = useQuery<Order[]>({
    queryKey: ['products'],
    queryFn: getOrdersHistory,
  })

  if (isLoading) {
    return <span>Carregando...</span>
  }

  if (error) {
    return <span>Erro ao carregar os pedidos</span>
  }

  return <pre>{JSON.stringify(orders, null, 2)}</pre>
}

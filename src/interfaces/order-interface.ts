export interface OrderItem {
  id: string
  product: {
    id: string
    name: string
    price: number
  }
  price: number
  quantity: number
}

export interface Order {
  id: string
  items: OrderItem[]
  price: number
}

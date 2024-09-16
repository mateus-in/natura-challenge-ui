export interface CartItem {
  id: string
  product: {
    id: string
    name: string
    price: number
  }
  quantity: number
}

export interface Cart {
  id: string
  items: CartItem[]
}

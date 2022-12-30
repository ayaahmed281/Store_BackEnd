export type Order = {
  id?: number
  order_status?: string
  quantity?: number
  product_id?: number
  user_id?: number
}

export type Product = {
  pid?: number
  pName?: string
  category?: string
  price?: number
}

export type User = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  id?: number
}

export type OrdersProducts = {
  id?: number
  quantity?: number
  order_id?: number
  product_id?: number
}

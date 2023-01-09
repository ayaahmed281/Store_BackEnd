"use strict"
import Client from "../database"
import {Order, OrdersProducts} from "../types"

export class Orders {
  async index(): Promise<Order[] | Error> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders"
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      return new Error(`there is an error: ${err}`)
    }
  }
  async show(id: string): Promise<Order | Error> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT * FROM orders WHERE id=($1)"
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      return new Error(`there is an error ${id}. Error: ${err}`)
    }
  }
  async create(orderData: Order): Promise<Order | Error> {
    try {
      const conn = await Client.connect()
      const sql =
        "INSERT INTO orders (order_status, quantity, product_id, user_id) VALUES($1, $2, $3, $4) RETURNING *"

      const result = await conn.query(sql, [
        orderData.order_status,
        orderData.quantity,
        orderData.product_id,
        orderData.user_id
      ])
      console.log(result)

      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      console.log(err)
      return new Error(`there is an error: ${err}`)
    }
  }

  async update(order: Order, id: number): Promise<Order | Error> {
    try {
      const sql = `UPDATE orders SET order_status = $1, quantity = $2, product_id = $3, user_id= $4 WHERE id = ${id} RETURNING *`
      const conn = await Client.connect()
      const result = await conn.query(sql, [
        order.order_status,
        order.quantity,
        order.product_id,
        order.user_id
      ])
      console.log("rrrrrrrrrrrrrr", result)
      const orders = result.rows[0]
      conn.release()
      return orders
    } catch (err) {
      console.log("rrrrrrrrrrrrrr", err)

      return new Error(`there is an error in  ${order.id}. Error: ${err}`)
    }
  }

  async delete(id: string): Promise<Order | Error> {
    try {
      const conn = await Client.connect()
      const sql = "DELETE FROM orders WHERE id=($1)"
      const result = await conn.query(sql, [id])
      const order = result.rows[0]
      conn.release()
      return order
    } catch (err) {
      return new Error(`there is an error ${id}. Error: ${err}`)
    }
  }

  async addProductWithOrder(productPlusOrder: OrdersProducts): Promise<OrdersProducts | Error> {
    try {
      const conn = await Client.connect()
      const sql =
        "INSERT INTO ordersProducts (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *"
      const result = await conn.query(sql, [
        productPlusOrder.order_id,
        productPlusOrder.product_id,
        productPlusOrder.quantity
      ])
      conn.release()
      return result.rows[0]
    } catch (err) {
      return new Error(`there is an error: ${err}`)
    }
  }
}

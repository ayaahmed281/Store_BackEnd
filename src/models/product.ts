import Client from "../database"
import {Product} from "../types"

export class Products {
  async index(): Promise<Product[] | Error> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT * FROM products"
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      return new Error(`there is an error: ${err}`)
    }
  }

  async show(pid: number): Promise<Product | Error> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT * FROM products WHERE pid=($1)"
      const result = await conn.query(sql, [pid])
      conn.release()
      return result.rows[0]
    } catch (err) {
      return new Error(`there is an error ${pid}. in : ${err}`)
    }
  }

  async create(product: Product): Promise<Product | Error> {
    try {
      const conn = await Client.connect()
      const sql = "INSERT INTO products (p_name, price, category) VALUES($1, $2, $3) RETURNING *"
      const result = await conn.query(sql, [product.pName, product.price, product.category])
      const products = result.rows[0]
      conn.release()
      return products
    } catch (err) {
      return new Error(`there is an error  ${product.pName}. in : ${err}`)
    }
  }

  async update(product: Product, pid: number): Promise<Product | Error> {
    try {
      const conn = await Client.connect()
      const sql = `UPDATE products SET pName = $1, price = $2, category = $3 WHERE pid = ${pid} RETURNING pid, p_name, price, category`
      const result = await conn.query(sql, [product?.pName, product?.price, product?.category])
      const products = result.rows[0]
      conn.release()
      return products
    } catch (err) {
      return new Error(`there is an error  ${product.pName}. in : ${err}`)
    }
  }

  async delete(pid: number): Promise<Product | Error> {
    try {
      const sql = "DELETE FROM products WHERE pid=($1)"
      const conn = await Client.connect()
      const result = await conn.query(sql, [pid])
      const product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      return new Error(`there is an error  ${pid}. in : ${err}`)
    }
  }
}

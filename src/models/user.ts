import bcrypt from "bcrypt"

import Client from "../database"
import {User} from "../types"

export class Users {
  async authenticateUser(pass: string, email: string): Promise<User | null> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT password FROM users WHERE email=($1)"
      const {BCRYPT_PASSWORD} = process.env
      const result = await conn.query(sql, [email])
      if (result.rows.length) {
        const {password} = result.rows[0]
        const isExist = bcrypt.compareSync(`${pass}${BCRYPT_PASSWORD}`, password)
        if (isExist) {
          const sql = "SELECT id, email, firstName, lastName FROM users WHERE email=($1)"
          const result = await conn.query(sql, [email])
          return result.rows[0]
        }
      }
      return null
    } catch (err) {
      return null
    }
  }
  async index(): Promise<User[] | Error> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT id, email, firstName, lastName FROM users"
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      return new Error(`there is an error: ${err}`)
    }
  }

  async show(id: number): Promise<User | Error> {
    try {
      const conn = await Client.connect()
      const sql = "SELECT id, email, firstName, lastName FROM users WHERE id=($1)"
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      return new Error(`there is an error in ${id}: ${err}`)
    }
  }

  async create(user: User): Promise<User | Error> {
    try {
      const conn = await Client.connect()
      const sql =
        "INSERT INTO users (firstName, lastName, email, password) VALUES($1, $2, $3, $4) RETURNING id, firstName, lastName, email"
      const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env
      const hash =
        BCRYPT_PASSWORD &&
        SALT_ROUNDS &&
        user.password &&
        bcrypt.hashSync(user.password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS))
      const result = await conn.query(sql, [user.firstName, user.lastName, user.email, hash])
      const users = result.rows[0]
      conn.release()
      return users
    } catch (err) {
      return new Error(`there is an error in ${user.firstName}: ${err}`)
    }
  }

  async update(user: User, id: number): Promise<User | Error> {
    try {
      const conn = await Client.connect()
      const sql = `UPDATE users SET firstName = $1, lastName = $2, email = $3 WHERE id = ${id} RETURNING id, firstName, lastName, email`
      const result = await conn.query(sql, [user.firstName, user.lastName, user.email])
      const userUpdated = result.rows[0]
      conn.release()
      return userUpdated
    } catch (err) {
      return new Error(`there is an error: ${err}`)
    }
  }
  async delete(id: number): Promise<User | Error> {
    try {
      const conn = await Client.connect()
      const sql = "DELETE FROM users WHERE id=($1)"
      const result = await conn.query(sql, [id])
      const user = result.rows[0]
      conn.release()
      return user
    } catch (err) {
      return new Error(`there is an error in ${id}: ${err}`)
    }
  }
}

import dotenv from "dotenv"
import {Pool} from "pg"

dotenv.config()

const {POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD} = process.env
const client = new Pool({
  host: "localhost",
  port: 5434,
  database: "dev",
  user: "postgres",
  password: "aya"
})

export default client

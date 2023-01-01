import dotenv from "dotenv"
import {Pool} from "pg"

dotenv.config()

const {POSTGRES_HOST, POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD, ENV} = process.env
console.log("Env", ENV)
const client = new Pool({
  host: "localhost",
  port: 5434,
  database: ENV === "dev" ? "dev" : "test",
  user: "postgres",
  password: "aya"
})

export default client

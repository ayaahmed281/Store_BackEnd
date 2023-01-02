import dotenv from "dotenv"
import {Pool} from "pg"

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_USERNAME,
  DEV_POSTGRES_DB,
  TEST_POSTGRES_TEST_DB,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  ENV
} = process.env
const client = new Pool({
  host: POSTGRES_HOST,
  port: parseInt(POSTGRES_PORT as string, 10),
  database: ENV === "dev" ? DEV_POSTGRES_DB : TEST_POSTGRES_TEST_DB,
  user: POSTGRES_USERNAME,
  password: POSTGRES_PASSWORD
})

export default client

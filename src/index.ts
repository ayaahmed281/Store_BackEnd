import bodyParser from "body-parser"
import express, {Application} from "express"

import order from "./handelers/order"
import product from "./handelers/product"
import user from "./handelers/user"

const app: Application = express()

app.listen("54246", () => {
  console.log(`Server is starting at prot:${54242}`)
})

app.use(bodyParser.json())
app.get("/", function (req, res) {
  res.send("hello world")
})
app.use("/api", product)
app.use("/api", user)
app.use("/api", order)

// app.get("/books", function (req, res) {
//   try {
//     res.send("get all books")
//   } catch (err) {
//     res.status(400)
//     res.json(err)
//   }
// })

// app.get("/books/:id", function (req, res) {
//   try {
//     res.send("get book by id")
//   } catch (err) {
//     res.status(400)
//     res.json(err)
//   }
// })

// app.delete("/books", function (req, res) {
//   try {
//     res.send("delete all books")
//   } catch (err) {
//     res.status(400)
//     res.json(err)
//   }
// })

export default app

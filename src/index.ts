import bodyParser from "body-parser"
import express, {Application} from "express"
import bookRoute from "./handelers/book"
import {BookStore} from "./models/book"

const app: Application = express()

app.listen("54242", () => {
  console.log(`Server is starting at prot:${54242}`)
})

app.use(bodyParser.json())
app.get("/", function (req, res) {
  // BookStore.index();
  res.send("hello world")
})

bookRoute(app)

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

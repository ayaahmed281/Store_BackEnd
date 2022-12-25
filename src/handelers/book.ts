import express, {Request, Response} from "express"
import {BookStore} from "../models/book"

const books = new BookStore()

const index = async (req: Request, res: Response) => {
  const bookRes = await books.index()
  res.json(bookRes)
}

const bookRoute = (app: express.Application) => {
  app.get("/books", index)
}

export default bookRoute

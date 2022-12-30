import express, {Router, Request, Response} from "express"
import {Products} from "../models/product"
import {authToken} from "../helpers"

import {Product} from "../types"

const router: Router = express.Router()

const store = new Products()

router.get("/products", async (_req: Request, res: Response) => {
  try {
    const products = await store.index()
    res.json(products)
  } catch (err) {
    res.json(err)
  }
})

router.get("/products/:id", async (_req: Request, res: Response) => {
  try {
    const Product = await store.show(parseInt(_req.params.id, 1))
    res.json(Product)
  } catch (err) {
    res.json(err)
  }
})

router.post("/products", authToken, async (req: Request, res: Response) => {
  try {
    const Product: Product = {
      price: req.body.price,
      pName: req.body.name,
      category: req.body?.category
    }
    await store.create(Product).then((_res) => {
      res.json({
        data: Product,
        statusCode: 200,
        message: "Done."
      })
    })
  } catch (err) {
    res.json({
      statusCode: 400,
      message: "an error occurred.",
      data: err
    })
  }
})

router.put("/products/:id", authToken, async (req: Request, res: Response) => {
  try {
    const Product: Product = {
      category: req.body.category,
      price: req.body.price,
      pName: req.body.name
    }
    await store.update(Product, parseInt(req.params.id, 1)).then(() => {
      res.json({
        statusCode: 200,
        message: "Done.",
        data: Product
      })
    })
  } catch (err) {
    res.json(err)
  }
})

router.delete("/products/:pid", authToken, async (_req: Request, res: Response) => {
  try {
    await store.delete(parseInt(_req.params.pid, 1)).then(() => {
      res.json({
        message: "Done.",
        statusCode: 200
      })
    })
  } catch (err) {
    res.json(err)
  }
})

export default router

import express, {Router, Request, Response} from "express"
import {authToken} from "../helpers"
import {Orders} from "../models/order"
import {Order} from "../types"

const router: Router = express.Router()

const store = new Orders()

router.get("/orders", authToken, async (_req: Request, res: Response) => {
  try {
    const orders = await store.index()
    res.json(orders)
  } catch (err) {
    res.json(err)
  }
})

router.get("/orders/:id", authToken, async (_req: Request, res: Response) => {
  try {
    const order = await store.show(_req.params.id)
    res.json(order)
  } catch (err) {
    res.json(err)
  }
})

router.post("/orders", authToken, async (req: Request, res: Response) => {
  try {
    const {id, order_status, user_id, quantity, product_id} = req.body
    const order: Order = {id, order_status, quantity, product_id, user_id}
    await store.create(order).then((_res) => {
      res.json({statusCode: 200, message: "Added", data: order})
    })
  } catch (err) {
    res.json({
      statusCode: 400,
      message: "an error occurred",
      data: err
    })
  }
})

router.post("/orders/post", authToken, async (req: express.Request, res: express.Response) => {
  try {
    const {quantity, order_id: orderId, product_id: productId} = req.body
    if (!orderId || !productId || !quantity) {
      return res.status(400).json({
        error: "data not found"
      })
    }
    const product = await store.addProductWithOrder({
      order_id: orderId,
      product_id: productId,
      quantity
    })
    res.status(200).json(product)
  } catch (err) {
    res.json({statusCode: 400, message: "an error occurred", data: err})
  }
})

router.put("/orders/id", authToken, async (req: Request, res: Response) => {
  try {
    const {order_status, quantity, product_id, user_id} = req.body
    const order: Order = {order_status, quantity, product_id, user_id}

    await store.update(order, parseInt(req.params.id, 1)).then(() => {
      res.json({
        statusCode: 200,
        data: order,
        message: "Done"
      })
    })
  } catch (err) {
    res.json(err)
  }
})

router.delete("/orders/id", authToken, async (_req: Request, res: Response) => {
  try {
    await store.delete(_req.params.id).then(() => {
      res.json({statusCode: 200, message: "Done."})
    })
  } catch (err) {
    res.json(err)
  }
})

export default router

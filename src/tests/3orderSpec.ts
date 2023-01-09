import {Orders} from "../models/order"
import {Order} from "../types"

const store = new Orders()

describe("Order Model", () => {
  it("should add a order", async () => {
    const result: any = await store.create({
      order_status: "pending",
      quantity: 1,
      user_id: 1,
      product_id: 1
    })

    expect(result?.user_id).toEqual(1)
  })

  it("should add a order", async () => {
    const result = await store.update(
      {
        order_status: "processing",
        quantity: 8,
        user_id: 1,
        product_id: 1
      },
      1
    )

    expect(result).toEqual({
      order_status: "processing",
      quantity: 8,
      user_id: 1,
      product_id: 1,
      id: 1
    })
  })

  it("index method should return a list of Orders", async () => {
    const result: any = await store.index()
    expect(result[result.length - 1].quantity).toEqual(8)
  })

  it("show method should return the correct Orders", async () => {
    const result = await store.show("1")
    expect(result).toEqual({
      id: 1,
      order_status: "processing",
      quantity: 8,
      user_id: 1,
      product_id: 1
    })
  })

  it("delete method should remove the Product", async () => {
    store.delete("2")
    const result = await store.show("2")

    expect(result).not.toBeDefined()
  })
})

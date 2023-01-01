import {Products} from "../models/product"
import {Product} from "../types"

const store = new Products()

describe("product Model", () => {
  const productAya: Product = {
    pid: 1,
    pName: "jaket",
    category: "clothes",
    price: 20
  }

  async function createProduct(productAya: Product) {
    return store.create(productAya)
  }

  async function deleteProduct(id: number) {
    return store.delete(id)
  }

  it("should have an index method", () => {
    expect(store.index).toBeDefined()
  })

  it("should have a create method", () => {
    expect(store.create).toBeDefined()
  })

  it("should have a remove method", () => {
    expect(store.delete).toBeDefined()
  })

  it("index method should return a list of productAyas", async () => {
    const createdProduct: any = await createProduct(productAya)
    const productAyaList = await store.index()

    expect(productAyaList).toEqual([createdProduct])

    await deleteProduct(createdProduct.id)
  })
})

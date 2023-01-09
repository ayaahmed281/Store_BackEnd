import {Products} from "../models/product"
import {Product} from "../types"

const store = new Products()

describe("product Model", () => {
  const productAya1: Product = {
    pid: 1,
    pName: "jaket",
    category: "clothes",
    price: 20
  }
  const productAya2: Product = {
    pid: 2,
    pName: "jaket",
    category: "clothes",
    price: 20
  }
  const productAya3: Product = {
    pid: 3,
    pName: "jaket",
    category: "clothes",
    price: 20
  }
  const productAya4: Product = {
    pid: 4,
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
    const createdProduct1: any = await createProduct(productAya1)
    const createdProduct2: any = await createProduct(productAya2)
    const createdProduct3: any = await createProduct(productAya3)
    const createdProduct4: any = await createProduct(productAya4)
    const productAyaList: any = await store.index()
    console.log(productAyaList)
    expect(productAyaList?.length).toBeDefined()
    await deleteProduct(createdProduct4.pid)
  })
})

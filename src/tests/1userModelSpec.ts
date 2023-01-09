import {Users} from "../models/user"
import {User} from "../types"

const store = new Users()

describe("User Model", () => {
  const userAya1: User = {
    firstName: "aya",
    email: "aya@aya.com",
    lastName: "ahmed",
    password: "123",
    id: 1
  }
  const userAya2: User = {
    firstName: "aya",
    email: "aya@aya.com",
    lastName: "ahmed",
    password: "123",
    id: 2
  }
  const userAya3: User = {
    firstName: "aya",
    email: "aya@aya.com",
    lastName: "ahmed",
    password: "123",
    id: 3
  }
  const userAya4: User = {
    firstName: "aya",
    email: "aya@aya.com",
    lastName: "ahmed",
    password: "123",
    id: 4
  }

  async function createUser(userAya: User) {
    return store.create(userAya)
  }

  async function deleteUser(id: number) {
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

  it("index method should return a list of userAyas", async () => {
    const createdUser1: any = await createUser(userAya1)
    const createdUser2: any = await createUser(userAya2)
    const createdUser3: any = await createUser(userAya3)
    const createdUser4: any = await createUser(userAya4)
    const userAyaList: any = await store.index()
    expect(userAyaList.length).toBeDefined()
    await deleteUser(createdUser4.id)
  })
})

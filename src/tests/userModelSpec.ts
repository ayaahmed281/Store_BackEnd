import {Users} from "../models/user"
import {User} from "../types"

const store = new Users()

describe("User Model", () => {
  const userAya: User = {
    firstName: "aya",
    email: "aya@aya.com",
    lastName: "ahmed",
    password: "123"
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

  it("create method that should create a userAya", async () => {
    const createdUser: any = await createUser(userAya)
    console.log(createdUser)
    const {firstName, lastName, id} = createdUser
    if (createdUser) {
      expect(firstName).toBe(userAya.firstName)
      expect(lastName).toBe(userAya.lastName)
    }

    await deleteUser(id)
  })

  it("index method should return a list of userAyas", async () => {
    const createdUser: any = await createUser(userAya)
    const userAyaList = await store.index()

    expect(userAyaList).toEqual([createdUser])

    await deleteUser(createdUser.id)
  })
})

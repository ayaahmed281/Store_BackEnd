import {Users} from "../models/user"
import {User} from "../types"

const store = new Users()

describe("User Model", () => {
  const user: User = {
    id: 1,
    firstName: "aya",
    email: "aya@aya.com",
    lastName: "ahmed",
    password: "password123"
  }

  async function createUser(user: User) {
    return store.create(user)
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

  it("create method should create a user", async () => {
    const createdUser: any = await createUser(user)

    const {firstName, lastName, id} = createdUser
    if (createdUser) {
      expect(firstName).toBe(user.firstName)
      expect(lastName).toBe(user.lastName)
    }

    await deleteUser(id)
  })

  it("index method should return a list of users", async () => {
    const createdUser: any = await createUser(user)
    const userList = await store.index()

    expect(userList).toEqual([createdUser])

    await deleteUser(createdUser.id)
  })
})

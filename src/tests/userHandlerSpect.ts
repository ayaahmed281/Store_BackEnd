import supertest from "supertest"
import app from "../index"

import {createJWTToken} from "../helpers"

const request = supertest(app)
const token: string = createJWTToken(1, "bearer")

describe("User handler: ", () => {
  it("/user should add order ", () => {
    const data = {
      firstName: "aya",
      lastName: "Ahmed",
      email: "a@a.com",
      password: "123"
    }
    request
      .post("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect("Content-Type", "application/json")
      .expect(201)
      .expect({
        statusCode: 200,
        message: "user has been succesfully created.",
        data: {
          firstName: "aya",
          lastName: "Ahmed",
          email: "a@a.com",
          password: "123"
        },
        token
      })
  })

  it("api/users should update user", () => {
    const data = [
      {
        id: 4,
        email: "a@a.com",
        firstname: "aya",
        lastname: "Ahmed"
      }
    ]
    request
      .get("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", "application/json")
      .expect(data)
  })

  it("/api/users/1", () => {
    const data = {
      firstName: "Aya",
      lastName: "Ahmed",
      email: "a@a.com",
      password: "123"
    }
    request
      .put("/api/users")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect({
        statusCode: 200,
        message: "D",
        data: {
          firstName: "Aya",
          lastName: "Ahmed",
          email: "a@a.com"
        }
      })
  })
})

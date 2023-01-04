import supertest from "supertest"
import app from "../index"

import {createJWTToken} from "../helpers"

const request = supertest(app)
const token: string = createJWTToken(1, "bearer")

describe("product handler: ", () => {
  it("/product should add order ", () => {
    const data = {
      pid: 1,
      pName: "jaket",
      category: "clothes",
      price: 20
    }
    request
      .post("/api/productsList")
      .set("Authorization", `Bearer ${token}`)
      .send(data)
      .expect("Content-Type", "application/json")
      .expect(201)
      .expect({
        statusCode: 200,
        message: "product has been succesfully created.",
        data: {
          firstName: "aya",
          lastName: "Ahmed",
          email: "a@a.com",
          password: "123"
        },
        token
      })
  })

  it("api/productsList should update product", () => {
    const data = [
      {
        id: 4,
        email: "a@a.com",
        firstName: "aya",
        lastName: "Ahmed"
      }
    ]
    request
      .get("/api/productsList")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", "application/json")
      .expect(data)
  })

  it("/api/productsList/1", () => {
    const data = {
      firstName: "Aya",
      lastName: "Ahmed",
      email: "a@a.com",
      password: "123"
    }
    request
      .put("/api/productsList")
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

import supertest from "supertest"
import fs from "fs"
import app from "../index"

const request = supertest(app)

describe("Test endpoint responses", () => {
  const projectPath: string = process.cwd()
  it("gets the api endpoint", async () => {
    const response = await request.get("/resizing?name=d.jpg&width=1100&height=700")
    expect(response.status).toBe(200)
  })
  it("should resize image if get correct data from the user and add it to the right folder ", async () => {
    await request.get("/resizing?name=d.jpg&width=110&height=700")
    const resizedImagePath: string = projectPath + `/src/resized/110_700_d.jpg`
    expect(fs.existsSync(resizedImagePath.toString())).toBeTruthy()
  })
  it("should throw error if get not valid data from the user", async () => {
    const response = await request.get("/resizing?name=dsss.jpg")
    expect(response.body.error).toBe("check ur data in the url")
  })
})

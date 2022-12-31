import express, {Router, Request, Response} from "express"
import {Users} from "../models/user"
import jwt from "jsonwebtoken"
import {authToken} from "../helpers"
import {User} from "../types"

const router: Router = express.Router()

const store = new Users()

router.get("/users", authToken, async (_req: Request, res: Response) => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (err) {
    res.json(err)
  }
})

router.get("/users/:id", authToken, async (_req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(_req.params.id, 1))
    res.json(user)
  } catch (err) {
    res.json(err)
  }
})

router.post("/users", async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email
    }
    await store.create(user).then((_res) => {
      const token = jwt.sign({user}, process.env.TOKEN_SECRET as string)
      res.json({
        statusCode: 200,
        message: "Done.",
        data: user,
        token
      })
    })
  } catch (err) {
    res.json({statusCode: 404, message: "an error occurred.", data: err})
  }
})

router.put("/users/:id", authToken, async (req: Request, res: Response) => {
  try {
    const user: User = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }
    await store.update(user, parseInt(req.params.id, 1)).then(() => {
      res.json({statusCode: 200, message: "Done", data: user})
    })
  } catch (err) {
    res.json(err)
  }
})

router.delete("/users/:id", authToken, async (_req: Request, res: Response) => {
  try {
    await store.delete(parseInt(_req.params.id, 1)).then(() => {
      res.json({
        statusCode: 200,
        message: "Done."
      })
    })
  } catch (err) {
    res.json(err)
  }
})

router.post("/users/authentication", async (_req: Request, res: Response) => {
  const {email, password}: {email: string; password: string} = _req.body
  try {
    const oldUser = await store.authenticateUser(password, email)

    const token = jwt.sign({oldUser}, process?.env?.TOKEN_SECRET as string)
    if (oldUser) {
      res.status(200).json({
        status: "Authorized",
        data: {token, user: oldUser}
      })
    } else {
      res.status(401).json({
        status: "error",
        message: "un authorize user."
      })
    }
  } catch (err) {
    res.json(err)
  }
})

export default router

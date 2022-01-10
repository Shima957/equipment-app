import { NextApiHandler } from "next"
import prisma from "@/lib/prisma"
import * as z from 'zod'

const requestBodyScheme = z.object({
  id: z.string(),
  displayName: z.string(),
  email: z.string(),
  userId: z.string(),
})

const createUserDb: NextApiHandler = async (req, res) => {
  try {
    const result = requestBodyScheme.parse(req.body)
    await prisma.user.create({
      data: {
        id: result.id,
        displayName: result.displayName,
        email: result.email,
        userId: result.userId
      }
    })

    res.status(200).end()

  } catch (error) {
    console.error(error)
  }
}

export default createUserDb

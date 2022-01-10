import { NextApiHandler } from "next"
import prisma from "@/lib/prisma"
import * as z from 'zod'
import { Prisma } from "@prisma/client"

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
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        res.status(500).end()
      }
    }
  }
}

export default createUserDb

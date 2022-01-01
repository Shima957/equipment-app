import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import * as z from 'zod'

const requestBodyScheme = z.object({
  category: z.string(),
  name: z.string(),
  maker: z.string(),
  webUrl: z.string(),
  imgUrl: z.string().nullable()
})

const createGear: NextApiHandler = async (req, res) => {
  try {
    const result = requestBodyScheme.parse(req.body)
    await prisma.dAW.create({
      data: {
        category: result.category,
        name: result.name,
        maker: result.maker,
        webUrl: result.webUrl,
        imgUrl: result.imgUrl
      }
    })
    res.status(200).end()
  } catch (error) {
    console.error(error)
  }
}

export default createGear

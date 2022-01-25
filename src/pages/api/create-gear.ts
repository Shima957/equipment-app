import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";
import * as z from 'zod'

const requestBodyScheme = z.object({
  category: z.string(),
  name: z.string(),
  maker: z.string(),
  webUrl: z.string().nullable(),
  imgUrl: z.string().nullable()
})

const createGear: NextApiHandler = async (req, res) => {
  try {
    const result = requestBodyScheme.parse(req.body)
    if (result.imgUrl) {
      await prisma.gears.create({
        data: {
          category: result.category,
          name: result.name,
          maker: result.maker,
          web_url: result.webUrl,
          img_url: result.imgUrl
        }
      })
    } else {
      await prisma.gears.create({
        data: {
          category: result.category,
          name: result.name,
          maker: result.maker,
          web_url: result.webUrl,
          img_url: null
        }
      })
    }

    res.status(200).end()
  } catch (error) {
    console.error(error)
  }
}

export default createGear

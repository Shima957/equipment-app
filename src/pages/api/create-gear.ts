import createGearDb from "@/util/createGearDb";
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
    createGearDb(result)
    res.status(200).end()
  } catch (error) {
    console.error(error)
  }
}

export default createGear

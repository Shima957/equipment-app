import { NextApiHandler } from "next";
import prisma from "@/lib/prisma";
import * as z from 'zod'

const requestBodyShcema = z.object({
  sendData: z.object({
    category: z.string(),
    name: z.string(),
    maker: z.string(),
    webUrl: z.string().nullable(),
    imgUrl: z.string().nullable()
  }),
  gearId: z.number()
})

const UpdateGear: NextApiHandler = async (req, res) => {
  const result = requestBodyShcema.parse(req.body)

  await prisma.gears.update({
    where: {
      id: result.gearId
    },
    data: {
      ...result.sendData
    }
  })

  res.status(200).json({ data: 'success' })
}

export default UpdateGear

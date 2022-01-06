import { NextApiHandler } from "next";
import prisma from '@/lib/prisma'

const getGear: NextApiHandler = async (req, res) => {
  const { category } = req.query
  const data = await prisma.gears.findMany({
    where: {
      category: category as string
    }
  })

  res.json(data)
}

export default getGear

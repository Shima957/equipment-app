import { NextApiHandler } from "next";
import prisma from '@/lib/prisma'

const getGear: NextApiHandler = async (req, res) => {
  const { category } = req.query
  if (category === 'DAW') {
    const daw = await prisma.daw.findMany({
      where: {
        category: category
      },
    })

    return res.json(daw)
  }

  if (category === 'スピーカー') {
    const speaker = await prisma.speacker.findMany({
      where: {
        category: category
      },
    })
    res.json(speaker)
  }
}

export default getGear

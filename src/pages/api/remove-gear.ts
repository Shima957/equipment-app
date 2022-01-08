import { NextApiHandler } from "next"
import prisma from "@/lib/prisma"

const removeGear: NextApiHandler = async (req, res) => {
  const { gearId } = req.body

  const post = await prisma.post.findFirst({
    where: {
      gearsId: gearId
    }
  })

  await prisma.post.delete({
    where: {
      id: post?.id
    }
  })

  res.end()
}

export default removeGear

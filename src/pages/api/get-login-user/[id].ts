import prisma from "@/lib/prisma"
import { NextApiHandler } from "next"

const getLoginUser: NextApiHandler = async (req, res) => {

  const { id } = req.query

  const user = await prisma.user.findUnique({
    where: {
      id: id as string
    }
  })

  res.json(user)
}

export default getLoginUser

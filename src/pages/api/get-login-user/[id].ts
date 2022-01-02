import prisma from "@/lib/prisma"
import { NextApiHandler } from "next"

const getLoginUser: NextApiHandler = async (req, res) => {

  const { query: { id } } = req

  const user = await prisma.user.findUnique({
    where: {
      id: id as string
    }
  })

  res.json(user)
}

export default getLoginUser

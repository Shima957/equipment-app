import { NextApiHandler } from "next"
import prisma from "@/lib/prisma"

const UpdateProfile: NextApiHandler = async (req, res) => {
  const data = req.body
  await prisma.user.update({
    where: {
      id: data.id as string
    },
    data: {
      displayName: data.name,
      avatorUrl: data.imgUrl
    }
  })

  res.end()
}

export default UpdateProfile

import { NextApiHandler } from "next"
import prisma from "@/lib/prisma"

const UpdateProfile: NextApiHandler = async (req, res) => {
  const data = req.body

  await prisma.users.update({
    where: {
      id: data.id as string
    },
    data: {
      display_name: data.name,
      twitter_id: data.twitterId === '' ? null : data.twitterId,
      soundcloud_id: data.soundCloudId === '' ? null : data.soundCloudId,
      avatar_url: data.imgUrl
    }
  })

  res.end()
}

export default UpdateProfile

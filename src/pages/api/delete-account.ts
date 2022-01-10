import { auth } from "@/lib/supabase"
import { NextApiHandler } from "next"
import prisma from '@/lib/prisma'

const deleteAccount: NextApiHandler = async (req, res) => {
  const { data } = await auth.api.getUserByCookie(req)
  if (data) {
    await auth.api.deleteUser(data?.id, process.env.NEXT_PUBLIC_ROLE_KEY as string)
    const user = await prisma.user.findUnique({
      where: {
        id: data.id
      },
      select: {
        userId: true
      }
    })

    await prisma.post.deleteMany({
      where: {
        authorId: user?.userId
      }
    })

    await prisma.user.delete({
      where: {
        id: data.id
      }
    })
  }

  res.end()
}

export default deleteAccount

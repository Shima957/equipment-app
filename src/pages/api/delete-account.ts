import { auth } from "@/lib/supabase"
import { NextApiHandler } from "next"
import prisma from '@/lib/prisma'

const deleteAccount: NextApiHandler = async (req, res) => {
  const { data } = await auth.api.getUserByCookie(req)
  if (data) {
    await auth.api.deleteUser(data?.id, process.env.NEXT_PUBLIC_ROLE_KEY as string)
    const user = await prisma.users.findUnique({
      where: {
        id: data.id
      },
      select: {
        user_id: true
      }
    })

    await prisma.post.deleteMany({
      where: {
        author_id: user?.user_id
      }
    })

    await prisma.users.delete({
      where: {
        id: data.id
      }
    })
  }

  res.end()
}

export default deleteAccount

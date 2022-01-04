import { NextApiHandler } from "next";
import prisma from "@/lib/prisma";

const SubmitUsingGear: NextApiHandler = async (req, res) => {
  const data = req.body
  await prisma.post.create({
    data: {
      daw: data.gear,
      authorId: data.authorId
    }
  })

  res.end()
}

export default SubmitUsingGear

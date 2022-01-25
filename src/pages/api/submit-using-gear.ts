import { NextApiHandler } from "next";
import prisma from "@/lib/prisma";

const SubmitUsingGear: NextApiHandler = async (req, res) => {
  const data = req.body
  await prisma.post.create({
    data: {
      author_id: data.authorId,
      gearsId: data.gear.id,
    }
  })

  res.end()
}

export default SubmitUsingGear

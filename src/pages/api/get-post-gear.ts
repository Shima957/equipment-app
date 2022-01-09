import prisma from "@/lib/prisma";
import { NextApiHandler } from "next";

const getPostGear: NextApiHandler = async (req, res) => {
  const userId = req.query.userId

  const gearsId = await prisma.post.findMany({
    where: {
      authorId: userId as string,
    },
    select: {
      gearsId: true,
    },
  });

  const gears = await Promise.all(
    gearsId.map(async (gear) => {
      const gears = await prisma.gears.findFirst({
        where: {
          id: gear.gearsId as number,
        },
      });

      return gears;
    })
  );

  res.json(gears)

}

export default getPostGear

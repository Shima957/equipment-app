import prisma from "@/lib/prisma"

type result = {
  category: string;
  name: string;
  maker: string;
  webUrl: string | null;
  imgUrl: string | null;
}

const createGearDb = async (result: result) => {
  if (result.category === 'DAW') {
    await prisma.daw.create({
      data: {
        category: result.category,
        name: result.name,
        maker: result.maker,
        webUrl: result.webUrl,
        imgUrl: result.imgUrl
      }
    })
  }

  if (result.category === 'スピーカー') {
    await prisma.speacker.create({
      data: {
        category: result.category,
        name: result.name,
        maker: result.maker,
        webUrl: result.webUrl,
        imgUrl: result.imgUrl
      }
    })
  }
}

export default createGearDb

import { NextApiHandler } from "next"

const ChangeEmail: NextApiHandler = async (req, res) => {
  const data = req.body
  await prisma?.users.update({
    where: {
      email: data.email
    },
    data: {
      email: data.newEmail
    }
  })
  res.end()
}

export default ChangeEmail

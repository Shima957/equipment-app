import { auth } from "@/lib/supabase";
import { NextApiHandler } from "next";

const getAuthCookie: NextApiHandler = async (req, res) => {
  const { data } = await auth.api.getUserByCookie(req)

  res.json(data)
}

export default getAuthCookie

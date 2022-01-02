import { auth } from "@/lib/supabase";
import { NextApiHandler } from "next";

const setAuthCookie: NextApiHandler = (req, res) => {
  auth.api.setAuthCookie(req, res)
}

export default setAuthCookie

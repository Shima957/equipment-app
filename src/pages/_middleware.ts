import paths from "@/paths";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const token = req.cookies['sb:token']
  const pathname = req.nextUrl.pathname

  if (token && pathname === (paths.signIn && paths.signUp)) {
    return NextResponse.redirect(paths.home)
  }
}

export default middleware

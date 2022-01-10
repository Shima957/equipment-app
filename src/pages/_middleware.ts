import paths from "@/paths";
import { NextRequest, NextResponse } from "next/server";

const middleware = async (req: NextRequest) => {
  const token = req.cookies['sb:token']
  const pathname = req.nextUrl.pathname

  if (token && pathname === paths.signIn) {
    return NextResponse.redirect(paths.home)
  }

  if (token && pathname === paths.signUp) {
    return NextResponse.redirect(paths.home)
  }

  if (!token && pathname === paths.setting) {
    return NextResponse.redirect(paths.home)
  }
}

export default middleware

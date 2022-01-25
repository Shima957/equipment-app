import { users } from "@prisma/client";
import { atom } from "recoil";

const LoginUserState = atom<users | null>({
  key: 'LoginUser',
  default: null
})

export default LoginUserState

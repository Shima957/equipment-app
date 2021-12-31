import { User } from "@prisma/client";
import { atom } from "recoil";

const LoginUserState = atom<User | null>({
  key: 'LoginUser',
  default: null
})

export default LoginUserState

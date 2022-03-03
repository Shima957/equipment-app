import { users } from "@prisma/client";
import { atom } from "recoil";

export const LoginUserState = atom<users | null>({
  key: 'LoginUser',
  default: null
})

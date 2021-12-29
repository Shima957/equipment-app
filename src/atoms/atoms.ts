import { User } from "@prisma/client";
import { atom } from "recoil";

const userState = atom<User | null>({
  key: 'userState',
  default: null
})

export default userState

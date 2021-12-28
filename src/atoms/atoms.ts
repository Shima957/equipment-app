import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

const userSession = atom<Session | null>({
  key: 'userSession',
  default: null
})

export default userSession

import { Session } from "@supabase/supabase-js";
import { atom } from "recoil";

const userSession = atom<Session | null>({
  key: 'session',
  default: null
})

export default userSession

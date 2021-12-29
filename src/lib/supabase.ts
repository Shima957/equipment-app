import { createClient } from '@supabase/supabase-js'
import { GoTrueClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const auth = new GoTrueClient({
  url: `${supabaseUrl}/auth/v1`,
  headers: {
    accept: 'json',
    apiKey: supabaseAnonKey
  }
})


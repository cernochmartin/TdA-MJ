import { createClient } from "@supabase/supabase-js"
const envVariables = useRuntimeConfig()

export const supabase = createClient(envVariables.public.supabaseUrl, envVariables.public.supabaseKey)
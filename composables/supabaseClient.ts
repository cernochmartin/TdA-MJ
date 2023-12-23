import { createClient } from "@supabase/supabase-js"
const envVariables = useRuntimeConfig()

export const supabaseClient = createClient(envVariables.public.supabaseUrl, envVariables.public.supabaseKey)
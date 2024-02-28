import { createClient } from '@supabase/supabase-js'
const envVariables = useRuntimeConfig()

export const client = createClient(envVariables.public.supabaseUrl, envVariables.public.supabaseKey)    
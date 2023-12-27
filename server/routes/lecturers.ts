import { client } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
        const { data } = await client
            .from('profiles_db')
            .select('*')
        return {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: data 
        }
    }
)
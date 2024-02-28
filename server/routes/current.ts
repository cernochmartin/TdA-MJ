import { client } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
    const current = await client.auth.getSession()
    const user = current.data.session?.user


    const xxx = await client.auth.getUser()

    console.log('222', current)
    return {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        currentUser: user
    }    
})
import { client } from '~/utils/supabase'

export default defineEventHandler(async (event) => {

    if (event.node.req.method === 'GET') {
        const { data } = await client
            .from('lecturer_db')
            .select()
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: data 
        }  
    }
            
    if (event.node.req.method === 'POST') {
        const body = await readBody(event)
        const { data } = await client
            .from('lecturer_db')
            .insert({
                body
            })
        return {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: data 
        }
    }
})
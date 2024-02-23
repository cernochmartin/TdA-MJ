import { client } from '~/utils/supabase'

export default defineEventHandler(async (event) => {

    const uuid = event.node.req.url?.split('/').pop()

    if (event.node.req.method === 'GET') {
        const { data } = await client
            .from('lecturer_db')
            .select()
            .eq('lecturer_uuid', uuid)
        return {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: data
        }  
    }

    if (event.node.req.method === 'DELETE') {
        await client
            .from('lecturer_db')
            .delete()
            .eq('lecturer_uuid', uuid)
        return {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: `Instance ${uuid} deleted succesfully.`
        }  
    }
        
    if (event.node.req.method === 'PUT') {
        const body = await readBody(event)
        
        const { data } = await client
            .from('lecturer_db')
            .update(body)
            .eq('lecturer_uuid', uuid)
        return {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: data
        }  
    }
})
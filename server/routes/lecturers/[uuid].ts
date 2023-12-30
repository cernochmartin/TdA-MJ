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
        const { data } = await client
            .from('lecturer_db')
            .update({
                title_before: 'Pejchy 2.0',
                first_name: 'asdas',
                middle_name: 'asda',
                last_name: 'asda',
                title_after: 'asdas',
                picture_url: 'asda',
                location: 'asdas',
                bio: 'sada',
                claim: 'claim',
                price_per_hour: 111,
                tags: [
                    {
                        name: 'asdasd'
                    }
                ],
                contact: {
                    telephone_numbers: ['sadas', 'sadasd'],
                    emails: ['sadsa', 'sdada']
                }
            })
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
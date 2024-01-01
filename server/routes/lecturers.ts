import { client } from '~/utils/supabase'

export default defineEventHandler(async (event) => {

    if (event.node.req.method === 'GET') {
        const { data } = await client
            .from('lecturer_db')
            .select(`*
                telephone_db(
                    telephone
                )
            `)
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
        const { data } = await client
            .from('lecturer_db')
            .insert({
                title_before: 'tohle jsem jaaa',
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
                    telephone_numbers: ['uknow23', 'sadasd'],
                    emails: ['sadsa', 'sdada']
                }
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
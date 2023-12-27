import { client } from '~/utils/supabase'

export default defineEventHandler(async (event) => {
    console.log(event)

    if (event.node.req.method === 'GET') {
        const { data } = await client
            .from('lecturer_db')
            .select('*')
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
                uuid: '',
                title_before: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                title_after: '',
                picture_url: '',
                location: '',
                bio: '',
                price_per_hour: '',
                tags: [
                    {
                        uuid: '',
                        name: ''
                    }
                ],
                contact: {
                    telephone_numbers: [''],
                    emails: ['']
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
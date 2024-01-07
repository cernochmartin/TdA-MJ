import { client } from '~/utils/supabase'

export default defineEventHandler(async (event) => {

    // const body = await readBody(event)

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
        const { data } = await client
            .from('lecturer_db')
            .insert({
                title_before: 'tohle je test cislo 69',
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
                        uuid: 'e421d9ef-fb5c-42c2-9db8-fa4020653d89',
                        name: 'asdasd'
                    }
                ],
                contact: {
                    telephone_numbers: ['uknow23', 'sadasd'],
                    emails: ['sadsa', 'sdada']
                }
                // body
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
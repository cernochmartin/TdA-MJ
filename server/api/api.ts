const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
}

export default defineEventHandler((event) => {
    return {
        headers: headers,
        body: {
            secret: "The cake is a lie"
        }
    }
})
export default defineEventHandler((event) => {
    const response = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({secret: "The cake is a lie"})
    }
    return response
})
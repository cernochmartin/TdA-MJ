export default defineEventHandler((event) => {
    const response = {
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: { secret: "The cake is a lie" }
    }
    return response
})

// "Content-Type": "application/json; charset=utf-8"
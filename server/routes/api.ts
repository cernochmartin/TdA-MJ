export default defineEventHandler((event) => {
    return {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        secret: "The cake is a lie"
    }    
})
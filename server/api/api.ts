export default defineEventHandler((event) => {
    // setHeaders(event, { "content-type": "application/json" } )
    
    
return {
    method: "POST",
     headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: { secret: "The cake is a lie" }
}    
})
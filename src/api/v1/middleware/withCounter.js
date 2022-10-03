// MIDDLEWARE: embeds Durable Object into request
export const withCounter = (request) => {
  request.counter = request.Counter.get(request.params.id)
}

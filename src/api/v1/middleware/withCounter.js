// MIDDLEWARE: embeds Durable Object into request
export const withCounter = (request) => {
  request.counter = Counter.get(request.params.id)
}

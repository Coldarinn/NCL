import fastify from "fastify"
import { pong } from "./pong"

const server = fastify()

server.get("/ping", async () => {
  return pong
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})

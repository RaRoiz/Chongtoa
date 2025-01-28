import { Elysia } from "elysia"
import { ExampleController } from "./controller/example.controller"
import { SwaggerConfig } from "./config/swagger.config"
import { tlsConfig } from "./config/tls.config"
import cors from "@elysiajs/cors"
import { Database } from "./config/database.config"

Database.connect()

const app = new Elysia()
  .use(cors())
  .use(ExampleController)
  .use(SwaggerConfig)
  .listen({
    port: Bun.env.PORT || 8080,
    tls: tlsConfig
  })

console.log(
  `🦊 Elysia is running at https://${app.server?.hostname}:${app.server?.port}`
)

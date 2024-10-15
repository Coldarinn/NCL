import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix("api")
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })

  await app.listen(process.env.PORT)
}
bootstrap()
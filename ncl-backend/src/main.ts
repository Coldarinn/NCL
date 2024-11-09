import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix("api")
  app.use(cookieParser())
  app.enableCors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
  })

  await app.listen(process.env.PORT)
}
bootstrap()

// comment for check ci 5

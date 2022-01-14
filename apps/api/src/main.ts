import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import { DataInterceptor } from "./app/interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = "api";
  app.setGlobalPrefix("api");
  app.useGlobalInterceptors(new DataInterceptor());

  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

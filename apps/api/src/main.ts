import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SanitizeMongooseModelInterceptor } from "nestjs-mongoose-exclude";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const globalPrefix = "api";
  app.setGlobalPrefix("api");
  // app.useGlobalInterceptors(new DataInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    })
  );

  const configService = app.get(ConfigService);
  const port = configService.get("PORT");

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();

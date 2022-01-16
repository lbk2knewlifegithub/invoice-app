import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { SanitizeMongooseModelInterceptor } from "nestjs-mongoose-exclude";
import { AppModule } from "./app/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // app.useGlobalInterceptors(new DataInterceptor());
  app.setGlobalPrefix("/api");
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseId: false,
      excludeMongooseV: true,
    })
  );

  const configService = app.get(ConfigService);
  const port = configService.get("PORT") ?? 3000;

  await app.listen(port);
  Logger.log(`🚀 Application is running on: PORT=${port}`);
}

bootstrap();

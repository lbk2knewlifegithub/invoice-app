import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database";
import { DataInterceptor } from "./interceptor";
import { InvoicesModule } from "./invoices";
import { SharedModule } from "./shared.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SharedModule,
    DatabaseModule,
    AuthModule,
    InvoicesModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    // {
    //   provide: APP_PIPE,
    //   useClass: DataPipe,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: DataInterceptor,
    // },
  ],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database";
import { InvoicesModule } from "./invoices";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    InvoicesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database";
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
  controllers: [AppController],
})
export class AppModule {}

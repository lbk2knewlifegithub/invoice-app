import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
import { InvoicesModule } from "./invoices/invoices.module";

@Module({
  imports: [
    InvoicesModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
  ],
  controllers: [AppController],
})
export class AppModule {}

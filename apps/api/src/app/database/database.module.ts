import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseService } from "./database.service";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          uri:
            config.get<string>("NODE_ENV") === "test"
              ? config.get<string>("MONGO_TEST_CONNECTION_URL")
              : config.get<string>("MONGO_CONNECTION_URI"),
        };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseService } from "./database.service";

// function createMongoUrl(
//   username: string,
//   password: string,
//   host: string = "mongo"
// ) {
//   // if (!username || !password)
//   //   return `mongodb://${host}:27017/?authSource=admin`;
//   // return `mongodb://${username}:${password}@${host}:27017/?authSource=admin`;
//   return "mongodb://mongo-service:27017";
// }

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri =
          config.get("NODE_ENV") === "test"
            ? "mongodb://localhost:27017"
            : "mongodb://mongo-service:27017";

        return { uri };
      },
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}

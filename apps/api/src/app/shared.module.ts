import { CacheModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as redisStore from "cache-manager-redis-store";

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        store: redisStore,
        ttl: config.get("CACHE_TTL"),
        host: config.get("REDIS_HOST"),
        port: config.get("REDIS_PORT"),
      }),
    }),
  ],
  exports: [CacheModule],
})
export class SharedModule {}

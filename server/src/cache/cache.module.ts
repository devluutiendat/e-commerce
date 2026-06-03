import { Module } from '@nestjs/common';
import { Cacheable } from 'cacheable';
import { createKeyv } from '@keyv/redis';
import { CacheService } from './cache.service.js';

const TOP_SELLING_CACHE_TTL = "4h";
@Module({
  providers: [
    {
      provide: 'TOP_SELLING_CACHE_KEY',
      useFactory: () => {
        const secondary = createKeyv(
          'redis://localhost:6379',
          { namespace: 'keyv' },
        );

        return new Cacheable({
          secondary,
          ttl: TOP_SELLING_CACHE_TTL,
        });
      },
    },
    CacheService,
  ],
  exports: [CacheService],
})
export class CacheModule {}
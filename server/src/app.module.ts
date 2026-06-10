import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { PrismaService } from './config/prisma.service.js';
import { UsersModule } from './users/users.module.js';
import { ProductsModule } from './products/products.module.js';
import { CacheModule } from './cache/cache.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { MailModule } from './mail/mail.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config/dist/index.js';
import { BullModule } from '@nestjs/bull/dist/bull.module.js';

@Global()
@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CacheModule, OrdersModule, MailModule,
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        redis: {
          host: config.get('REDIS_HOST', 'localhost'),
          port: config.get('REDIS_PORT', 6379),
          password: config.get('REDIS_PASSWORD') || undefined,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

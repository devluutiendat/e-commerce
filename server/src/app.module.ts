import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { PrismaService } from './config/prisma.service.js';
import { UsersModule } from './users/users.module.js';
import { ProductsModule } from './products/products.module.js';
import { CacheModule } from './cache/cache.module.js';
import { OrdersModule } from './orders/orders.module';

@Global()
@Module({
  imports: [AuthModule, UsersModule, ProductsModule, CacheModule, OrdersModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

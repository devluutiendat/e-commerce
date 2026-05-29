import { Global, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module.js';
import { PrismaService } from './config/prisma.service.js';
import { UsersModule } from './users/users.module.js';

@Global()
@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { BullModule } from '@nestjs/bull/dist/bull.module.js';

@Module({
  imports: [
    BullModule.registerQueue({ name: 'email' }),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}

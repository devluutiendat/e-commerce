import {  Controller, Get } from "@nestjs/common";
import { MailService } from "./mail.service.js";
import { Public } from '../common/decorators/index.js';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Get()
  findAll() {
    return this.mailService.sendOrdersuccessfully(
      {
        to: 'luutiendat03112003@gmail.com',
        name: 'Dat',
        orderId: 12345, 
        productName: 'Product A',
        quantity: 2,
        amount: 500000
      }
    );
  }
}
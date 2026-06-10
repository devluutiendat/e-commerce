import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import type { Job } from 'bull';
import { MailService } from '../mail/mail.service.js';

@Processor('email')
export class EmailProcessor {
  private readonly logger = new Logger(EmailProcessor.name);

  constructor(private readonly mailService: MailService) {}

  @Process('order-success')
  async handleOrderSuccess(job: Job) {
    this.logger.log(`Processing order-success email job #${job.id}`);
    try {
      await this.mailService.sendOrdersuccessfully(job.data);
      this.logger.log(`Order-success email job #${job.id} completed`);
    } catch (err : any) {
      this.logger.error(`Job #${job.id} failed: ${err.message}`);
      throw err; 
    }
  }
}

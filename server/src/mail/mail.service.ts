import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailerService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendOrdersuccessfully(data: {
    to: string;
    name: string;
    orderId: number;
    productName: string;
    quantity: number;
    amount: number;
  }) {
    try {
    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Order successfully placed',
       html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Thank you for your order, ${data.name}!</h2>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <p><strong>Order ID:</strong> #${data.orderId}</p>
              <p><strong>Product:</strong> ${data.productName}</p>
              <p><strong>Quantity:</strong> ${data.quantity}</p>
              <p><strong>Total:</strong> ${data.amount.toLocaleString('vi-VN')} VND</p>
            </div>
            <p>Your order is being processed. We'll notify you when it ships.</p>
          </div>
        `,
      context: { name: data.name },
    });
       this.logger.log(`Order success email sent to ${data.to}`);
    } catch (err: any) {
      this.logger.error(`Failed to send email to ${data.to}:`, err.message);
      throw err;
    }
  }
}
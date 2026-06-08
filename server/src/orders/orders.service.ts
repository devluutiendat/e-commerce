import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import {
  CreateOrderDto,
  OrderQueryDto,
  UpdateOrderDto,
} from './dto/order.dto.js';
import { PrismaService } from 'src/config/prisma.service.js';
import { ProductsService } from 'src/products/products.service.js';
@Injectable()
export class OrdersService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly prisma: PrismaService, 
  ) {}

  async create(userId: number, dto: CreateOrderDto) {
    // Verify product exists
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const order = await this.prisma.orders.create({
      data: {
        userId,
        productId: dto.productId,
        quantity: dto.quantity,
      },
      include: {
        product: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });

    this.logger.log(`Order created: #${order.id} by user #${userId}`);
    return order;
  }

  async findAll(userId: number, role: number, query: OrderQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    // Non-admins can only see their own orders
    if (role < 2) where.userId = userId;

    const [orders, total] = await Promise.all([
      this.prisma.orders.findMany({
        where,
        skip,
        take: +limit,
        include: {
          product: {
            select: { id: true, name: true, price: true, images: true },
          },
          user: { select: { id: true, email: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.orders.count({ where }),
    ]);

    return {
      orders,
      meta: {
        total,
        page: +page,
        limit: +limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number, userId: number, role: number) {
    const order = await this.prisma.orders.findUnique({
      where: { id },
      include: {
        product: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    if (role < 2 && order.userId !== userId) {
      throw new ForbiddenException('Cannot access this order');
    }
    return order;
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.prisma.orders.update({
      where: { id },
      data: dto,
      include: {
        product: true,
        user: { select: { id: true, email: true, name: true } },
      },
    });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    this.logger.log(`Order updated: #${order.id}`);
    return order;
  }

  async remove(id: number) {
    const order = await this.prisma.orders.delete({ where: { id } });
    if (!order) throw new NotFoundException(`Order #${id} not found`);
    this.logger.log(`Order deleted: #${order.id}`);
    return { message: 'Order deleted successfully' };
  }
}

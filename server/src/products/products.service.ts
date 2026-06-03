import {
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service.js';
import {
  CreateProductDto,
  ProductQueryDto,
  UpdateProductDto,
} from './dto/product.dto.js';
import { CacheService } from '../cache/cache.service.js';
const TOP_SELLING_CACHE_KEY = 'products:top-selling';
const TOP_SELLING_CACHE_TTL = 60 * 5;


@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly cacheService: CacheService,
  ) { }

  async create(dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: { ...dto },
    });
    return product;
  }


  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException(`Product #${id} not found`);
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    const updated = await this.prisma.product.update({ where: { id }, data: dto });
    return updated;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
    return { message: 'Product deleted successfully' };
  }

  async findAll(query: ProductQueryDto) {
    const { page = 1, limit = 10, search, type, minPrice, maxPrice, sortBy = 'createdAt', order = 'desc' } = query;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (type) where.type = { equals: type, mode: 'insensitive' };
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take: +limit,
        orderBy: { [sortBy]: order },
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      products,
      meta: { total, page: +page, limit: +limit, totalPages: Math.ceil(total / limit) },
    };
  }

  async getTopSelling(limit = 10) {
    const cached = await this.cacheService.get(TOP_SELLING_CACHE_KEY);
    if (cached) {
      this.logger.log('Top-selling served from cache');
      return cached;
    }

    const topOrders = await this.prisma.orders.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      where: { active: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: +limit,
    });

    const productIds = topOrders.map((o) => o.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    // Merge with sold quantities
    const result = topOrders.map((order) => ({
      ...products.find((p) => p.id === order.productId),
      totalSold: order._sum.quantity,
    }));

    await this.cacheService.set(TOP_SELLING_CACHE_KEY, result, TOP_SELLING_CACHE_TTL);
    return result;
  }
}

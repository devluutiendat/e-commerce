import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../config/prisma.service.js';
import {
  CreateProductDto,
  UpdateProductDto,
} from './dto/product.dto.js';

@Injectable()
export class ProductsService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

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
}
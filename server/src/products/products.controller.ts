import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ProductsService } from './products.service.js';
import { CreateProductDto, ProductQueryDto, UpdateProductDto } from './dto/product.dto.js';
import { Public, Roles } from '../common/decorators/index.js';
import { RolesGuard } from '../common/guards/index.js';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  
  @Public()
  @Get('top-selling')
  @ApiOperation({ summary: 'Get top-selling products (cached)' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  getTopSelling(@Query('limit') limit = 10) {
    return this.productsService.getTopSelling(+limit);
  }
  
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all products with search/filter/sort/pagination' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(2) // admin only
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create product (Admin only)' })
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(2)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update product (Admin only)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(2)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete product (Admin only)' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}

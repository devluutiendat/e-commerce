import {
  IsString,
  IsInt,
  IsOptional,
  Min,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({ example: 'iPhone 15 Pro' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'Electronics' })
  @IsString()
  type!: string;

  @ApiProperty({ example: 'Latest Apple flagship phone' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 29990000, description: 'Price in VND' })
  @IsInt()
  @Min(0)
  price!: number;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @IsInt()
  @Min(0)
  discountPercent?: number;

  @ApiProperty({ example: 'url1.jpg,url2.jpg', description: 'Comma-separated image URLs' })
  @IsString()
  images!: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}


export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum ProductSortBy {
  PRICE = 'price',
  NAME = 'name',
  CREATED_AT = 'createdAt',
}

export class ProductQueryDto {
  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'iPhone' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ example: 'Electronics' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: 0 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  minPrice?: number;

  @ApiPropertyOptional({ example: 50000000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  maxPrice?: number;

  @ApiPropertyOptional({ enum: ProductSortBy, default: ProductSortBy.CREATED_AT })
  @IsOptional()
  @IsEnum(ProductSortBy)
  sortBy?: ProductSortBy = ProductSortBy.CREATED_AT;

  @ApiPropertyOptional({ enum: SortOrder, default: SortOrder.DESC })
  @IsOptional()
  @IsEnum(SortOrder)
  order?: SortOrder = SortOrder.DESC;
}

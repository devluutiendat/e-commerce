import {
  IsString,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

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


import {
  IsEmail,
  IsString,
  IsOptional,
  IsInt,
  Min,
  Max,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;
}

export class UpdateUserRoleDto {
  @ApiPropertyOptional({ example: 2, description: '1=user, 2=admin' })
  @IsInt()
  @Min(1)
  @Max(2)
  role!: number;
}

export class ChangePasswordDto {
  @IsString()
  currentPassword!: string;

  @IsString()
  newPassword!: string;
}

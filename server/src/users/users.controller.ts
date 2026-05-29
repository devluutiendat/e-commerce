import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service.js';
import { UpdateUserDto, UpdateUserRoleDto, ChangePasswordDto } from './dto/user.dto.js';
import { GetUser, Roles } from '../common/decorators/index.js';
import { RolesGuard } from '../common/guards/index.js';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@GetUser('id') userId: number) {
    return this.usersService.getProfile(userId);
  }

  @Get()
  @UseGuards(RolesGuard)
  @Roles(2) // admin only
  @ApiOperation({ summary: 'Get all users (Admin only)' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.usersService.findAll(+page, +limit);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles(2)
  @ApiOperation({ summary: 'Get user by ID (Admin only)' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Patch('me/password')
  @ApiOperation({ summary: 'Change current user password' })
  changePassword(
    @GetUser('id') userId: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(userId, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user (self or admin)' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @GetUser('id') requesterId: number,
    @GetUser('role') requesterRole: number,
  ) {
    return this.usersService.update(id, dto, requesterId, requesterRole);
  }

  @Patch(':id/role')
  @UseGuards(RolesGuard)
  @Roles(2)
  @ApiOperation({ summary: 'Update user role (Admin only)' })
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserRoleDto,
  ) {
    return this.usersService.updateRole(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete user (self or admin)' })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') requesterId: number,
    @GetUser('role') requesterRole: number,
  ) {
    return this.usersService.remove(id, requesterId, requesterRole);
  }
}

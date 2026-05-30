import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../config/prisma.service.js';
import { UpdateUserDto, UpdateUserRoleDto, ChangePasswordDto } from './dto/user.dto.js';

const USER_SELECT = {
  id: true,
  email: true,
  name: true,
  phone: true,
  address: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({ skip, take: limit, select: USER_SELECT, orderBy: { createdAt: 'desc' } }),
      this.prisma.user.count(),
    ]);
    return { users, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: USER_SELECT,
    });
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;  
  }

  async update(id: number, dto: UpdateUserDto, requesterId: number, requesterRole: number) {
    // Users can only update themselves; admins can update anyone
    if (requesterId !== id && requesterRole < 2) {
      throw new ForbiddenException('Cannot update another user');
    }
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: dto,
      select: USER_SELECT,
    });
  }

  async updateRole(id: number, dto: UpdateUserRoleDto) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: { role: dto.role },
      select: USER_SELECT,
    });
  }

  async remove(id: number, requesterId: number, requesterRole: number) {
    if (requesterId !== id && requesterRole < 2) {
      throw new ForbiddenException('Cannot delete another user');
    }
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'User deleted successfully' };
  }

  async changePassword(id: number, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    const isMatch = await bcrypt.compare(dto.currentPassword, user!.password);
    if (!isMatch) throw new UnauthorizedException('Current password is incorrect');

    const hashed = await bcrypt.hash(dto.newPassword, 12);
    await this.prisma.user.update({
      where: { id },
      data: { password: hashed },
    });
    return { message: 'Password changed successfully' };
  }

  async getProfile(userId: number) {
    return this.findOne(userId);
  }
}

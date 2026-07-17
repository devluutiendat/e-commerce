
export enum UserRole {
  USER = 1,
  ADMIN = 2,
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
}
export interface RefreshTokenDto {
  refreshToken: string;
}

export interface Product {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  discountPercent?: number;
  images: string; 
  createdAt: string;
  updatedAt: string;
}

export interface ProductQuery {
  page?: number;
  limit?: number;
  search?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "name" | "createdAt";
  order?: "asc" | "desc";
}

export interface CreateOrderDto {
  productId: number;
  quantity: number;
}

export interface UpdateOrderDto {
  quantity?: number;
  status?: boolean;
}

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  address?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: number;
  productId: number;
  product?: Product;
  userId: number;
  user?: User;
  quantity: number;
  status: boolean;
  totalPrice?: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  address?: string;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface CreateProductDto {
  name: string;
  type: string;
  description: string;
  price: number;
  discountPercent?: number;
  images: string;
}

export type UpdateProductDto = Partial<CreateProductDto>;

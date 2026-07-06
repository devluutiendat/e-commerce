
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

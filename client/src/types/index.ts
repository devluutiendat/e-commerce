
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
import { api } from "./client";
import type { AuthTokens, LoginDto, RegisterDto, RefreshTokenDto } from "@/types";

export const authApi = {
  register: (dto: RegisterDto) =>
    api.post<void>("/auth/register", dto).then((r) => r.data),

  login: (dto: LoginDto) =>
    api.post<AuthTokens>("/auth/login", dto).then((r) => r.data),

  refresh: (dto: RefreshTokenDto) =>
    api.post<AuthTokens>("/auth/refresh", dto).then((r) => r.data),

  logout: () => api.post<void>("/auth/logout").then((r) => r.data),
};

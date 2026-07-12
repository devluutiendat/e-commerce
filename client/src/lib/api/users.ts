import { api } from "./client";
import type {
  User,
  UpdateUserDto,
  ChangePasswordDto,
  PaginatedResponse,
} from "@/types";

export const usersApi = {
  getProfile: () => api.get<User>("/users/me").then((r) => r.data),

  findAll: (params?: { page?: number; limit?: number }) =>
    api
      .get<PaginatedResponse<User> | User[]>("/users", { params })
      .then((r) => r.data),

  findOne: (id: number) => api.get<User>(`/users/${id}`).then((r) => r.data),

  update: (id: number, dto: UpdateUserDto) =>
    api.patch<User>(`/users/${id}`, dto).then((r) => r.data),

  remove: (id: number) => api.delete<void>(`/users/${id}`).then((r) => r.data),

  changePassword: (dto: ChangePasswordDto) =>
    api.patch<void>("/users/me/password", dto).then((r) => r.data),
};

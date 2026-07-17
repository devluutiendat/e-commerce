import { api } from "./client";
import type { Order, CreateOrderDto, UpdateOrderDto } from "@/types";

export const ordersApi = {
  create: (dto: CreateOrderDto) =>
    api.post<Order>("/orders", dto).then((r) => r.data),

  findAll: () => api.get<{ orders: Order[] }>("/orders").then((r) => r.data.orders),

  findOne: (id: number) => api.get<Order>(`/orders/${id}`).then((r) => r.data),

  update: (id: number, dto: UpdateOrderDto) =>
    api.patch<Order>(`/orders/${id}`, dto).then((r) => r.data),

  remove: (id: number) => api.delete<void>(`/orders/${id}`).then((r) => r.data),
};

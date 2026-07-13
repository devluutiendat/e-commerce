import { api } from "./client";
import type {
  Product,
  CreateProductDto,
  UpdateProductDto,
  ProductQuery,
  ,
  ProductsResponse,
} from "@/types";

export const productsApi = {
  findAll: (params?: ProductQuery) =>
    api
      .get<ProductsResponse>("/products", { params })
      .then((r) => r.data),

  getTopSelling: () =>
    api.get<Product[]>("/products/top-selling").then((r) => r.data),

  findOne: (id: number) =>
    api.get<Product>(`/products/${id}`).then((r) => r.data),

  create: (dto: CreateProductDto) =>
    api.post<Product>("/products", dto).then((r) => r.data),

  update: (id: number, dto: UpdateProductDto) =>
    api.patch<Product>(`/products/${id}`, dto).then((r) => r.data),

  remove: (id: number) =>
    api.delete<void>(`/products/${id}`).then((r) => r.data),
};

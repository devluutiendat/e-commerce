import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productsApi } from "@/lib/api/products";
import { queryKeys } from "@/lib/query-keys";
import type {  CreateOrderDto, ProductQuery, UpdateOrderDto } from "@/types";

export function useProducts(params?: ProductQuery) {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productsApi.findAll(params),
    placeholderData: (prev) => prev,
  });
}

export function useTopSellingProducts() {
  return useQuery({
    queryKey: queryKeys.products.topSelling(),
    queryFn: productsApi.getTopSelling,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => productsApi.findOne(id),
    enabled: Number.isFinite(id),
  });
}

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CreateOrderDto) => productsApi.create(dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, dto }: { id: number; dto: UpdateOrderDto }) =>
      productsApi.update(id, dto),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.detail(variables.id),
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => productsApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
}

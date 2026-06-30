import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { tokenStorage } from "@/lib/api/client";
import { queryKeys } from "@/lib/query-keys";
import type { LoginDto, RegisterDto } from "@/types";


export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (dto: LoginDto) => authApi.login(dto),
    onSuccess: async (tokens) => {
      tokenStorage.set(tokens);
      await queryClient.invalidateQueries({ queryKey: queryKeys.users.me() });
      router.push("/");
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (dto: RegisterDto) => authApi.register(dto),
  });
}

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api/auth";
import { tokenStorage } from "@/lib/api/client";
import { queryKeys } from "@/lib/query-keys";
import type { LoginDto, RegisterDto } from "@/types";
import { useAuthStore } from "@/store/auth-store";

export function useCurrentUser() {
  const setUser = useAuthStore((s) => s.setUser);
  return useQuery({
    queryKey: queryKeys.users.me(),
    queryFn: async () => {
      const user = await usersApi.getProfile();
      setUser(user);
      return user;
    },
    enabled: typeof window !== "undefined" && !!tokenStorage.getAccess(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}


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

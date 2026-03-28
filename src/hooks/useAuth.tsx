"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, LoginCredentials } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";

export const useAuth = () => {
    const router = useRouter();
    const { setAuth, clearAuth } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: (credentials: LoginCredentials) => login(credentials),
        onSuccess: (data) => {
            document.cookie = `accessToken=${data.token}; path=/; SameSite=Lax`;

            fetch("/api/auth/set-refresh-token", {
                method: "POST",
                body: JSON.stringify({ token: data.token }),
            });

            setAuth({ email: "eve.holt@reqres.in", role: "admin" }, data.token);

            router.push("/users");
        },
    });

    const logout = () => {
        document.cookie = "accessToken=; path=/; max-age=0";

        fetch("/api/auth/logout", { method: "POST" });

        clearAuth();
        router.push("/login");
    };

    return {
        login: loginMutation.mutate,
        logout,
        isLoading: loginMutation.isPending,
        isError: loginMutation.isError,
        error: loginMutation.error,
    };
};

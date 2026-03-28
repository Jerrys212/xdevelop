import { renderHook, act } from "@testing-library/react";
import { useAuthStore } from "@/store/auth.store";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "@jest/globals";

describe("useAuthStore", () => {
    beforeEach(() => {
        useAuthStore.setState({ user: null, accessToken: null });
    });

    it("debe guardar el usuario y token al hacer setAuth", () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setAuth({ email: "test@test.com", role: "admin" }, "token123");
        });

        expect(result.current.user).toEqual({ email: "test@test.com", role: "admin" });
        expect(result.current.accessToken).toBe("token123");
    });

    it("debe limpiar el estado al hacer clearAuth", () => {
        const { result } = renderHook(() => useAuthStore());

        act(() => {
            result.current.setAuth({ email: "test@test.com", role: "admin" }, "token123");
            result.current.clearAuth();
        });

        expect(result.current.user).toBeNull();
        expect(result.current.accessToken).toBeNull();
    });
});

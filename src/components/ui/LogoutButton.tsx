"use client";

import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
    const { logout } = useAuth();

    return (
        <Button variant="outline" size="sm" onClick={logout}>
            Cerrar sesión
        </Button>
    );
}

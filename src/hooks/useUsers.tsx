"use client";

import { getUsers } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (page: number) => {
    return useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
    });
};

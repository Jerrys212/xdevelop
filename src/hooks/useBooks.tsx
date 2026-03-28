"use client";

import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "@/services/books.service";
import { BookFilters } from "@/types/book.types";

export const useBooks = (filters: BookFilters) => {
    return useQuery({
        queryKey: ["books", filters],
        queryFn: () => searchBooks(filters),
        enabled: !!filters.query,
    });
};

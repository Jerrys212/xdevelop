import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Post } from "@/types/post.types";

interface FavoritesState {
    favorites: Post[];
    addFavorite: (post: Post) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            addFavorite: (post) => set((state) => ({ favorites: [...state.favorites, post] })),
            removeFavorite: (id) =>
                set((state) => ({
                    favorites: state.favorites.filter((p) => p.id !== id),
                })),
            isFavorite: (id) => get().favorites.some((p) => p.id === id),
        }),
        { name: "favorites-storage" },
    ),
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Post } from "@/types/post.types";

interface FavoritesState {
    favoritePosts: Post[];
    addFavoritePost: (post: Post) => void;
    removeFavoritePost: (id: number) => void;
    isFavoritePost: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favoritePosts: [],
            addFavoritePost: (post) =>
                set((state) => ({ favoritePosts: [...state.favoritePosts, post] })),
            removeFavoritePost: (id) =>
                set((state) => ({ favoritePosts: state.favoritePosts.filter((p) => p.id !== id) })),
            isFavoritePost: (id) => get().favoritePosts.some((p) => p.id === id),
        }),
        { name: "favorites-storage" },
    ),
);

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getPosts, getPostById, createPost, updatePost } from "@/services/posts.service";
import { CreatePostDto, Post, UpdatePostDto } from "@/types/post.types";

export const usePosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });
};

export const usePostById = (id: number) => {
    return useQuery({
        queryKey: ["posts", id],
        queryFn: () => getPostById(id),
    });
};

export const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (post: CreatePostDto) => createPost(post),
        onSuccess: (newPost) => {
            queryClient.setQueryData<Post[]>(["posts"], (old) => [newPost, ...(old ?? [])]);
        },
        onError: () => {
            alert("Error al crear el post, intenta de nuevo.");
        },
    });
};

export const useUpdatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, post }: { id: number; post: UpdatePostDto }) => updatePost(id, post),
        onSuccess: (updatedPost) => {
            queryClient.setQueryData<Post>(["posts", updatedPost.id], updatedPost);
        },
        onError: () => {
            alert("Error al actualizar el post, intenta de nuevo.");
        },
    });
};

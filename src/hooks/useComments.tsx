"use client";

import { useQuery } from "@tanstack/react-query";
import { getCommentsByPostId } from "@/services/posts.service";

export const useComments = (postId: number) => {
    return useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getCommentsByPostId(postId),
    });
};

import axios from "axios";
import { Post, Comment, CreatePostDto, UpdatePostDto } from "@/types/post.types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getPosts = async (): Promise<Post[]> => {
    const { data } = await axios.get<Post[]>(`${BASE_URL}/posts`);
    return data;
};

export const getPostById = async (id: number): Promise<Post> => {
    const { data } = await axios.get<Post>(`${BASE_URL}/posts/${id}`);
    return data;
};

export const getCommentsByPostId = async (id: number): Promise<Comment[]> => {
    const { data } = await axios.get<Comment[]>(`${BASE_URL}/posts/${id}/comments`);
    return data;
};

export const createPost = async (post: CreatePostDto): Promise<Post> => {
    const { data } = await axios.post<Post>(`${BASE_URL}/posts`, post);
    return data;
};

export const updatePost = async (id: number, post: UpdatePostDto): Promise<Post> => {
    const { data } = await axios.put<Post>(`${BASE_URL}/posts/${id}`, post);
    return data;
};

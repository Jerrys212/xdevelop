export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    role: "admin" | "user";
}

export interface UsersResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}

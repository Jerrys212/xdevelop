import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_REQRES_URL;

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const { data } = await axios.post<LoginResponse>(`${BASE_URL}/api/login`, credentials, {
        headers: { "x-api-key": process.env.NEXT_PUBLIC_REQRES_API_KEY },
    });
    return data;
};

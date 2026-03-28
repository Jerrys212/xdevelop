import axios from "axios";
import { UsersResponse } from "@/types/user.types";

const BASE_URL = process.env.NEXT_PUBLIC_REQRES_URL;
const API_KEY = process.env.NEXT_PUBLIC_REQRES_API_KEY;

export const getUsers = async (page: number): Promise<UsersResponse> => {
    const { data } = await axios.get<UsersResponse>(`${BASE_URL}/api/users?page=${page}`, {
        headers: { "x-api-key": API_KEY },
    });
    return data;
};

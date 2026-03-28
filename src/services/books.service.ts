import axios from "axios";
import { BooksResponse, BookFilters } from "@/types/book.types";

const BASE_URL = "https://openlibrary.org";
const LIMIT = 10;

export const searchBooks = async (filters: BookFilters): Promise<BooksResponse> => {
    const params = new URLSearchParams();
    params.set("q", filters.query || "javascript");
    params.set("limit", String(LIMIT));
    params.set("offset", String((filters.page - 1) * LIMIT));

    if (filters.author) params.set("author", filters.author);
    if (filters.year) params.set("first_publish_year", filters.year);

    const { data } = await axios.get<BooksResponse>(`${BASE_URL}/search.json?${params.toString()}`);
    return data;
};

export interface Book {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
    isbn?: string[];
}

export interface BooksResponse {
    numFound: number;
    start: number;
    docs: Book[];
}

export interface BookFilters {
    query: string;
    author: string;
    year: string;
    page: number;
}

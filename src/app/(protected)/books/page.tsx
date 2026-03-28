import BookSearch from "@/components/books/BookSearch";

export default function BooksPage() {
    return (
        <main className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Buscador de Libros</h1>
            <BookSearch />
        </main>
    );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { useBooks } from "@/hooks/useBooks";
import { Book } from "@/types/book.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function BookSearch() {
    const [query, setQuery] = useState("javascript");
    const [author, setAuthor] = useState("");
    const [year, setYear] = useState("");
    const [page, setPage] = useState(1);
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);

    const [activeFilters, setActiveFilters] = useState({
        query: "javascript",
        author: "",
        year: "",
        page: 1,
    });

    const { data, isLoading, isError } = useBooks(activeFilters);

    const handleSearch = () => {
        setPage(1);
        setActiveFilters({ query, author, year, page: 1 });
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        setActiveFilters((f) => ({ ...f, page: newPage }));
    };

    const totalPages = data ? Math.ceil(data.numFound / 10) : 0;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="space-y-1 md:col-span-2">
                    <Label>Búsqueda</Label>
                    <Input placeholder="Buscar libros..." value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                <div className="space-y-1">
                    <Label>Autor</Label>
                    <Input
                        placeholder="Filtrar por autor..."
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="space-y-1">
                    <Label>Año</Label>
                    <Input
                        placeholder="Año de publicación..."
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        type="number"
                    />
                </div>
            </div>
            <Button onClick={handleSearch}>Buscar</Button>

            {isLoading && <p className="text-center py-8">Buscando libros...</p>}
            {isError && <p className="text-center py-8 text-red-500">Error al buscar libros.</p>}
            {data?.numFound === 0 && <p className="text-center py-8 text-slate-500">No se encontraron libros.</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {data?.docs.map((book) => (
                    <Card
                        key={book.key}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setSelectedBook(book)}
                    >
                        <CardHeader className="pb-2">
                            <div className="flex gap-3">
                                {book.cover_i ? (
                                    <Image
                                        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
                                        alt={book.title}
                                        width={40}
                                        height={60}
                                        className="rounded object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-14 bg-slate-200 rounded flex items-center justify-center text-xs text-slate-400">
                                        Sin portada
                                    </div>
                                )}
                                <div>
                                    <CardTitle className="text-sm line-clamp-2">{book.title}</CardTitle>
                                    {book.author_name && (
                                        <p className="text-xs text-slate-500 mt-1">
                                            {book.author_name.slice(0, 2).join(", ")}
                                        </p>
                                    )}
                                    {book.first_publish_year && (
                                        <p className="text-xs text-slate-400">{book.first_publish_year}</p>
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            {data && data.numFound > 0 && (
                <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">
                        Página {page} de {totalPages} — {data.numFound} resultados
                    </span>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Anterior
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page >= totalPages}
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            )}

            <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedBook?.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                        {selectedBook?.cover_i && (
                            <Image
                                src={`https://covers.openlibrary.org/b/id/${selectedBook.cover_i}-M.jpg`}
                                alt={selectedBook.title}
                                width={120}
                                height={180}
                                className="rounded object-cover mx-auto"
                            />
                        )}
                        {selectedBook?.author_name && (
                            <div>
                                <p className="text-sm font-medium">Autores</p>
                                <p className="text-sm text-slate-600">{selectedBook.author_name.join(", ")}</p>
                            </div>
                        )}
                        {selectedBook?.first_publish_year && (
                            <div>
                                <p className="text-sm font-medium">Año de publicación</p>
                                <p className="text-sm text-slate-600">{selectedBook.first_publish_year}</p>
                            </div>
                        )}
                        {selectedBook?.isbn && (
                            <div>
                                <p className="text-sm font-medium">ISBN</p>
                                <p className="text-sm text-slate-600">{selectedBook.isbn[0]}</p>
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

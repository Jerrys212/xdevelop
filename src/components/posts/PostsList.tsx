"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { usePosts, useCreatePost } from "@/hooks/usePosts";
import { useFavoritesStore } from "@/store/favorites.store";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function PostsList() {
    const { data: posts, isLoading, isError } = usePosts();
    const { mutate: createPost, isPending } = useCreatePost();
    const { addFavorite, removeFavorite, isFavorite } = useFavoritesStore();
    const { user } = useAuthStore();

    const [userFilter, setUserFilter] = useState("");
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [newPost, setNewPost] = useState({ title: "", body: "" });

    const filteredPosts = useMemo(() => {
        return (posts ?? [])
            .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
            .filter((post) => (userFilter ? post.userId === Number(userFilter) : true));
    }, [posts, search, userFilter]);

    const handleCreate = () => {
        createPost(
            { ...newPost, userId: 1 },
            {
                onSuccess: () => {
                    setOpen(false);
                    setNewPost({ title: "", body: "" });
                },
            },
        );
    };

    if (isLoading) return <p className="text-center py-8">Cargando posts...</p>;
    if (isError) return <p className="text-center py-8 text-red-500">Error al cargar posts.</p>;

    return (
        <div className="space-y-4">
            <div className="flex gap-2 flex-wrap items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                    <Input
                        placeholder="Buscar por título..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="max-w-sm"
                    />
                    <Input
                        placeholder="Filtrar por userId..."
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        className="w-40"
                        type="number"
                    />
                </div>

                {user?.role === "admin" && (
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>Crear Post</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Nuevo Post</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <Label>Título</Label>
                                    <Input
                                        value={newPost.title}
                                        onChange={(e) => setNewPost((p) => ({ ...p, title: e.target.value }))}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Contenido</Label>
                                    <Input
                                        value={newPost.body}
                                        onChange={(e) => setNewPost((p) => ({ ...p, body: e.target.value }))}
                                    />
                                </div>
                                <Button onClick={handleCreate} disabled={isPending} className="w-full">
                                    {isPending ? "Creando..." : "Crear"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="grid gap-3">
                {filteredPosts.map((post) => (
                    <Card key={post.id}>
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <CardTitle className="text-base">{post.title}</CardTitle>
                                <div className="flex gap-2 shrink-0">
                                    <Badge variant="outline">User {post.userId}</Badge>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            isFavorite(post.id) ? removeFavorite(post.id) : addFavorite(post)
                                        }
                                    >
                                        {isFavorite(post.id) ? "⭐" : "☆"}
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-sm text-slate-600 line-clamp-2">{post.body}</p>
                            <Link href={`/posts/${post.id}`}>
                                <Button variant="outline" size="sm">
                                    Ver detalle
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

"use client";

import { useState } from "react";
import { usePostById, useUpdatePost } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { useAuthStore } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostDetail({ id }: { id: number }) {
    const { data: post, isLoading: loadingPost } = usePostById(id);
    const { data: comments, isLoading: loadingComments } = useComments(id);
    const { mutate: updatePost, isPending } = useUpdatePost();
    const { user } = useAuthStore();

    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ title: "", body: "" });

    const handleEdit = () => {
        setForm({ title: post?.title ?? "", body: post?.body ?? "" });
        setEditing(true);
    };

    const handleSave = () => {
        updatePost({ id, post: form }, { onSuccess: () => setEditing(false) });
    };

    if (loadingPost) return <p className="text-center py-8">Cargando post...</p>;
    if (!post) return <p className="text-center py-8 text-red-500">Post no encontrado.</p>;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between">
                        {editing ? (
                            <Input
                                value={form.title}
                                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                                className="text-lg font-bold"
                            />
                        ) : (
                            <CardTitle>{post.title}</CardTitle>
                        )}
                        {user?.role === "admin" && !editing && (
                            <Button variant="outline" size="sm" onClick={handleEdit}>
                                Editar
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {editing ? (
                        <>
                            <div className="space-y-1">
                                <Label>Contenido</Label>
                                <Input
                                    value={form.body}
                                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button onClick={handleSave} disabled={isPending}>
                                    {isPending ? "Guardando..." : "Guardar"}
                                </Button>
                                <Button variant="outline" onClick={() => setEditing(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p className="text-slate-600">{post.body}</p>
                    )}
                </CardContent>
            </Card>

            <div className="space-y-3">
                <h2 className="text-xl font-semibold">Comentarios {comments ? `(${comments.length})` : ""}</h2>
                {loadingComments ? (
                    <p>Cargando comentarios...</p>
                ) : (
                    comments?.map((comment) => (
                        <Card key={comment.id}>
                            <CardHeader className="pb-1">
                                <CardTitle className="text-sm">{comment.name}</CardTitle>
                                <p className="text-xs text-slate-500">{comment.email}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-slate-600">{comment.body}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

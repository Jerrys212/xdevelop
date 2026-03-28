import PostDetail from "@/components/posts/PostDetail";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="container mx-auto py-8 px-4">
            <PostDetail id={Number(id)} />
        </main>
    );
}

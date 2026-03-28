import PostsList from "@/components/posts/PostsList";

export default function PostsPage() {
    return (
        <main className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Posts</h1>
            <PostsList />
        </main>
    );
}

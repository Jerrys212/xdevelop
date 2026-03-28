import UsersTable from "@/components/users/UsersTable";

export default function UsersPage() {
    return (
        <main className="container mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-6">Usuarios</h1>
            <UsersTable />
        </main>
    );
}

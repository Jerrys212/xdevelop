"use client";

import { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from "@tanstack/react-table";
import { useUsers } from "@/hooks/useUsers";
import { User } from "@/types/user.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { exportUsersToCSV } from "@/lib/exportCsv";

export default function UsersTable() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
    const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

    const { data, isLoading, isError } = useUsers(page);

    const usersWithRole = useMemo(() => {
        return (data?.data ?? []).map((user) => ({
            ...user,
            role: user.id % 2 === 0 ? ("admin" as const) : ("user" as const),
        }));
    }, [data]);

    const filteredUsers = useMemo(() => {
        return usersWithRole
            .filter((user) => {
                const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
                return (
                    fullName.includes(search.toLowerCase()) ||
                    user.email.toLowerCase().includes(search.toLowerCase())
                );
            })
            .filter((user) => roleFilter === "all" || user.role === roleFilter);
    }, [usersWithRole, search, roleFilter]);

    const columns: ColumnDef<User>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        },
        {
            accessorKey: "avatar",
            header: "Avatar",
            cell: ({ row }) => (
                <Image
                    src={row.original.avatar}
                    alt={row.original.first_name}
                    width={32}
                    height={32}
                    className="rounded-full"
                />
            ),
        },
        {
            accessorKey: "first_name",
            header: "Nombre",
            cell: ({ row }) => `${row.original.first_name} ${row.original.last_name}`,
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Rol",
            cell: ({ row }) => (
                <Badge variant={row.original.role === "admin" ? "default" : "secondary"}>
                    {row.original.role}
                </Badge>
            ),
        },
    ];

    const table = useReactTable({
        data: filteredUsers,
        columns,
        state: { rowSelection },
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
    });

    const selectedIds = Object.keys(rowSelection).filter((k) => rowSelection[k]);

    const handleBulkDelete = () => {
        alert(`Eliminando usuarios: ${selectedIds.join(", ")}`);
        setRowSelection({});
    };

    if (isLoading) return <p className="text-center py-8">Cargando usuarios...</p>;
    if (isError) return <p className="text-center py-8 text-red-500">Error al cargar usuarios.</p>;

    return (
        <div className="space-y-4">
            <div className="flex gap-2 items-center">
                <Input
                    placeholder="Buscar por nombre o email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="max-w-sm"
                />
                {(["all", "admin", "user"] as const).map((r) => (
                    <Button
                        key={r}
                        variant={roleFilter === r ? "default" : "outline"}
                        onClick={() => setRoleFilter(r)}
                    >
                        {r === "all" ? "Todos" : r}
                    </Button>
                ))}
                <Button variant="outline" onClick={() => exportUsersToCSV(filteredUsers)}>
                    Exportar CSV
                </Button>
            </div>

            {selectedIds.length > 0 && (
                <div className="flex items-center gap-2 p-2 bg-slate-100 rounded">
                    <span className="text-sm">{selectedIds.length} seleccionados</span>
                    <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                        Eliminar seleccionados
                    </Button>
                </div>
            )}

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext(),
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">
                    Página {data?.page} de {data?.total_pages}
                </span>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => p - 1)}
                        disabled={page === 1}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((p) => p + 1)}
                        disabled={page === data?.total_pages}
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
}

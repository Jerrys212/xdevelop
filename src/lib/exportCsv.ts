import { User } from "@/types/user.types";

export const exportUsersToCSV = (users: User[]) => {
    const headers = ["ID", "Nombre", "Email", "Rol"];

    const rows = users.map((user) => [user.id, `${user.first_name} ${user.last_name}`, user.email, user.role]);

    const csvContent = [headers, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "usuarios.csv";
    link.click();

    URL.revokeObjectURL(url);
};

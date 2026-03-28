import Navbar from "@/components/ui/Navbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    if (!token) {
        redirect("/login");
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    );
}

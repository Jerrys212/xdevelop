"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/users", label: "Usuarios" },
    { href: "/posts", label: "Posts" },
    { href: "/books", label: "Libros" },
];

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <div className="flex gap-4">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-slate-900 ${
                        pathname.startsWith(link.href)
                            ? "text-slate-900 border-b-2 border-slate-900 pb-1"
                            : "text-slate-500"
                    }`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
}

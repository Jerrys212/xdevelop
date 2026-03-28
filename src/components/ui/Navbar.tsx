import LogoutButton from "./LogoutButton";
import NavLinks from "./NavLinks";

export default function Navbar() {
    return (
        <nav className="border-b bg-white px-4 py-3">
            <div className="container mx-auto flex items-center justify-between">
                <NavLinks />
                <LogoutButton />
            </div>
        </nav>
    );
}

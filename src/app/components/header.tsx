"use client";

import Link from "next/link";
import "../favicon.ico";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}




export default function Header() {

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                setUser(data.user);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function handleLogout() {
        try {
            await fetch("/api/auth/logout", { method: "POST"});
            setUser(null);
            router.push("/");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="header">
            <div>
                <Link href="/" className="header-title">Hooper</Link>
            </div>
            <div>
                <Link href="/inbox">Inbox</Link>
                {loading ? null : user ? (
                    <>
                        <Link href="/profile">{user?.firstName}</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link href="/signup">Signup</Link>
                        <Link href="/login">Login</Link>
                    </>
                )}
            </div>
        </div>
    );
}
"use client";

import Breakline from "./breakline";
import {FormEvent, useState} from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {

    const router = useRouter();

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        
        setStatus("submitting");
        setError(null);

        const formData = new FormData(e.currentTarget);

        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const data = await res.json();

            if(!res.ok) {
                setError(data.error || "Login failed.");
                setStatus("error");
                return;
            }
            
            console.log(data);
            setStatus("success");
            router.push("/");

        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
            setStatus("error");
        }
    }

    return (
        <div className="panel-container">
            <div className="panel">
                <h1><b>LOGIN</b></h1>
                <Breakline></Breakline>
                <form onSubmit={handleSubmit}>
                    <label>
                        Email:
                        <input type="email" name="email"></input>
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password"></input>
                    </label>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    );
}
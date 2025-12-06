"use client";

import Breakline from "./breakline";
import {FormEvent, useState} from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const router = useRouter();

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setStatus("submitting");
        setError(null);

        const formData = new FormData(e.currentTarget);

        const firstName = (formData.get("firstName") ?? "") as string;
        const lastName  = (formData.get("lastName")  ?? "") as string;
        const displayName = (formData.get("displayName") ?? "") as string;
        const email     = (formData.get("email")     ?? "") as string;
        const password  = (formData.get("password")  ?? "") as string;

        try {
            const signupRes = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstName, lastName, displayName, email, password }),
            });

            const signupData = await signupRes.json();

            if (!signupRes.ok) {
                setError(signupData.error || "Signup failed.");
                setStatus("error");
                return;
            }

            const loginRes = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const loginData = await loginRes.json();

            if (!loginRes.ok || !loginData.success) {
                setError(loginData.error || "Login failed.");
                setStatus("error");
                return;
            }

            console.log("Logged in:", loginData.user);
            setStatus("success");
            router.push("/"); // or router.replace("/")
        } catch (err) {
            console.error(err);
            setError("Something went wrong.");
            setStatus("error");
        }
    }


    return (
        <div className="panel-container">
            <div className="panel">
                <h1><b>SIGNUP</b></h1>
                <Breakline></Breakline>
                <form onSubmit={handleSubmit}>
                    <label>
                        First Name:
                        <input type="text" name="firstName"></input>
                    </label>
                    <label>
                        Last Name:
                        <input type="text" name="lastName"></input>
                    </label>
                    <label>
                        Display Name:
                        <input type="text" name="displayName"></input>
                    </label>
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
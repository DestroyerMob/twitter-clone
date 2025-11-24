import { FormEvent, useEffect, useState } from "react";

type Post = {
  id: string;
  messageContent: string;
}

type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}

export default function PostBar() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setStatus("submitting");
        setError(null);

        const formData = new FormData(e.currentTarget);

        const messageContent = formData.get("messageContent");
        const authorId = user?.id;
        try {
          const postRes = await fetch("/api/auth/post", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messageContent, authorId}),
          })
    
          if (!postRes.ok) {
            return;
          }
    
        } catch (err) {
          console.error(err);
        }
    }

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

    return (
        <div className="postBar">
            <form onSubmit={handleSubmit}>
                <textarea maxLength={255} placeholder={"What's happening?"} name="messageContent" id="messageContent"></textarea>
                <button>Post</button>
            </form>
        </div>
    )
}
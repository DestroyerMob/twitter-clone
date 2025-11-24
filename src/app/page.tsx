"use client";

import Image from "next/image";
import Header from "./components/header";
import PostInLine from "./components/postInline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PostBar from "./components/postBar";

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

export default function Home() {

  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function postPost() {
    const messageContent = "Hello, Darling.";
    const authorId = user?.id;
    try {
      const postRes = await fetch("/api/auth/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageContent, authorId}),
      })

      const postData = await postRes.json();

      if (!postRes.ok) {
        return;
      }

      setPosts((prev) => [postData.post, ...prev]);

    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/posts");
        const data = await res.json();
        setPosts(data.posts ?? []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Header></Header>
      <div className="forPage-container">
        <aside className="forPage-left">
        </aside>
        <main>
          <PostBar></PostBar>
          {!loading &&
            posts.map((post) => (
              <PostInLine key={post.id} postText={post.messageContent}></PostInLine>
            ))}
        </main>
        <aside className="forPage-right">
        </aside>
      </div>
    </div>
  );
}

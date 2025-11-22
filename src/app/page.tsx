"use client";

import Image from "next/image";
import Header from "./components/header";
import PostInLine from "./components/postInline";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  messageContent: string;
}

export default function Home() {

      const [posts, setPosts] = useState<Post[]>([]);
      const [loading, setLoading] = useState(true);

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
      {!loading &&
        posts.map((post) => (
          <PostInLine key={post.id} postText={post.messageContent}></PostInLine>
        ))}
    </div>
  );
}

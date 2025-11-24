import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      messageContent,
      authorId,
    } = body as {
      messageContent?: string;
      authorId?: string;
    };

    // Basic validation
    if (!messageContent || !authorId) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const post = await prisma.post.create({
      data: {
        messageContent,
        authorId,
      },
      select: {
        id: true,
        messageContent: true,
        authorId:true,
      },
    });

    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    console.error("Post error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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

    return NextResponse.json({ messageContent }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}

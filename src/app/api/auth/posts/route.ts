import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json({posts}, {status: 200});
    } catch (err) {
    console.error(err);
        return NextResponse.json(
        { error: "Failed to fetch posts" },
        { status: 500 }
        );
    }
}
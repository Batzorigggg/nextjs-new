import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
  const skip = parseInt(searchParams.get("skip") ?? "0");

  const where: Record<string, any> = {};

  try {
    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        select: {
          id: true,
          title: true,
          genres: true,
          imdb: true,
        },
        orderBy: { title: "asc" },
        take: limit,
        skip,
      }),
      prisma.movie.count({ where }),
    ]);

    return NextResponse.json({ movies, total, limit, skip });
  } catch (err: any) {
    console.error("GET /api/movies error:", err);
    return NextResponse.json(
      { error: err?.message ?? "Internal server error" },
      { status: 500 },
    );
  }
}

export async function POST() {
  return Response.json({ message: "POST request movie received" });
}

export async function PUT() {
  return Response.json({ message: "PUT request movie received" });
}

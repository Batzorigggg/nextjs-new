import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const limit = Math.min(parseInt(searchParams.get("limit") ?? "20"), 100);
  const skip = parseInt(searchParams.get("skip") ?? "0");

  const where: Record<string, any> = {};

  try {
    const [restaurants, total] = await Promise.all([
      prisma.restaurant.findMany({
        where,
        select: {
          id: true,
          name: true,
          cuisine: true,
          borough: true,
          address: {
            select: {
              building: true,
              street: true,
              zipcode: true,
              coord: true,
            },
          },
        },
        take: limit,
        skip,
      }),
      prisma.restaurant.count({ where }),
    ]);

    return NextResponse.json({ restaurants: restaurants, total, limit, skip });
  } catch (err: any) {
    console.error("GET /api/restaurants error:", err);
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

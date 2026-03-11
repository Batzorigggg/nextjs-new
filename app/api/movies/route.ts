import { prisma } from "@/lib/prisma";

export async function GET() {
  const movies = await prisma.movie.findMany({ take: 10 });

  return Response.json({ movies });
}
export async function POST() {
  return Response.json({ message: "POST request movie received" });
}

export async function PUT() {
  return Response.json({ message: "PUT request movie received" });
}

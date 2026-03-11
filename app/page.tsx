import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const movies = await prisma.movie.findMany({ take: 50 });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Movies</h1>
      <ul className="space-y-4">
        {movies.map((movie) => (
          <li key={movie.id} className="p-4 border rounded shadow">
            <h2 className="text-2xl font-semibold">{movie.title}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}

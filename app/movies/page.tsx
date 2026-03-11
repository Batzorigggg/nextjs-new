import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Movies() {
  const movies = await prisma.movie.findMany({ take: 10 });

  return (
    <div>
      <h1>Movies Page</h1>
      <p>List of movies</p>
      {movies?.map((movie) => (
        <div key={movie.id}>
          <Link href={`/movies/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

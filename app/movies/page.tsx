import { prisma } from "@/lib/prisma";
import Link from "next/link";
import MovieTable from "./components/MovieTable";

export default async function Movies() {
  // const movies = await prisma.movie.findMany({ take: 10 });

  return <MovieTable />;
}

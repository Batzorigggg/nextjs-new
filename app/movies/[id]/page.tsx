import { prisma } from "@/lib/prisma";

export default async function MovieDetail({
  params,
}: {
  params: { id: string };
}) {
  const movie = await prisma.movie.findUnique({
    where: {
      id: params.id,
    },
  });

  return <div>MoviaaeDetail {movie?.title}</div>;
}

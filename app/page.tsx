import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Restaurant from "./restaurants/[id]/page";

export default async function Home() {
  const restaurants = await prisma.restaurant.findMany({ take: 50 });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Link href="/restaurants">
        <Button>Restaurants</Button>
      </Link>
    </main>
  );
}

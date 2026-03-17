import { prisma } from "@/lib/prisma";

export default async function RestDetail({
  params,
}: {
  params: { id: string };
}) {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      id: params.id,
    },
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
        },
      },
    },
  });

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{restaurant.name}</h1>

      <p>Cuisine: {restaurant.cuisine}</p>

      <p>Borough: {restaurant.borough}</p>

      <p>
        Address: {restaurant.address?.building}{" "}
        {restaurant.address?.street}{" "}
        {restaurant.address?.zipcode}
      </p>
    </div>
  );
}
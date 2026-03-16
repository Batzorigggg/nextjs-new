"use client";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Restaurant as IRestaurant } from "../type";

export default function Restaurant() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState<IRestaurant | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/restaurants/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setRestaurant(data);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (!restaurant) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{restaurant.name}</h1>
    </div>
  );
}

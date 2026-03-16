"use client";

import { useEffect, useState } from "react";
import type { Restaurant } from "../type";
import Link from "next/link";
const PAGE_SIZE = 20;

export default function RestTable() {
  const [restaurant, setRestaurants] = useState<Restaurant[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loadedPage, setLoadedPage] = useState(-1);

  const loading = page !== loadedPage;
  console.log("restaurant", restaurant);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams({
      limit: String(PAGE_SIZE),
      skip: String(page * PAGE_SIZE),
    });

    fetch(`/api/restaurants?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setRestaurants(data.restaurants ?? []);
        setTotal(data.total ?? 0);
        setLoadedPage(page);
      })
      .catch(() => {
        if (!cancelled) setLoadedPage(page);
      });
    return () => {
      cancelled = true;
    };
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1.5rem" }}>
      <h1 style={{ marginBottom: "1rem" }}>Restaurants</h1>

      <p
        style={{ fontSize: "0.875rem", color: "#666", marginBottom: "0.75rem" }}
      >
        {loading ? "Loading..." : `${total.toLocaleString()} restaurants found`}
      </p>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.875rem",
          }}
        >
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th style={th}>Name</th>
              <th style={th}>Cuisine</th>
              <th style={th}>Borough</th>
              <th style={th}>Address</th>
            </tr>
          </thead>
          <tbody>
            {restaurant.map((restaurant) => (
              <tr
                key={restaurant.id}
                style={{ borderBottom: "1px solid #e5e7eb" }}
              >
                <td style={td}>
                  <Link
                    href={`/restaurants/${restaurant.id}`}
                    style={{
                      color: "#2563eb",
                      textDecoration: "none",
                      fontWeight: 500,
                    }}
                  >
                    {restaurant.name}
                  </Link>
                </td>
                <td style={td}>{restaurant.cuisine}</td>
                <td style={td}>{restaurant.borough}</td>
                <td style={td}>
                  {restaurant.address?.building} {restaurant.address?.street},{" "}
                  {restaurant.address?.zipcode}
                </td>
              </tr>
            ))}
            {!loading && restaurant.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{
                    ...td,
                    textAlign: "center",
                    color: "#9ca3af",
                    padding: "2rem",
                  }}
                ></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "10px 14px",
  fontWeight: 600,
  color: "#374151",
  whiteSpace: "nowrap",
};

const td: React.CSSProperties = {
  padding: "10px 14px",
  color: "#374151",
  verticalAlign: "top",
};

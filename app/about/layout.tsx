import React from "react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif" }}>{children}</div>
  );
}

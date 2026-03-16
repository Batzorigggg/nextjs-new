import { prisma } from "@/lib/prisma";
import Link from "next/link";
import RestTable from "./components/RestTable";

export default async function Restaurants() {
  return <RestTable />;
}

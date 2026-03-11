export async function GET() {
  return Response.json({ message: "GET request received" });
}
export async function POST() {
  return Response.json({ message: "POST request received" });
}

export async function PUT() {
  return Response.json({ message: "PUT request received" });
}

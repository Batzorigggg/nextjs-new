export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  return Response.json({
    message: `GET request for movie ${id} received`,
  });
}

export async function POST() {
  return Response.json({ message: "POST request movie received" });
}

export async function PUT() {
  return Response.json({ message: "PUT request movie received" });
}

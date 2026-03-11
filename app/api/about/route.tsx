export async function GET() {
  const content = "This is the about page content.";

  return Response.json(content);
}

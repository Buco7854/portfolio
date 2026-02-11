import { NextResponse } from "next/server";

const pbUrl =
  process.env.POCKETBASE_INTERNAL_URL ||
  process.env.NEXT_PUBLIC_POCKETBASE_URL;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  if (!pbUrl) {
    return NextResponse.json(
      { error: "PocketBase URL not configured" },
      { status: 500 },
    );
  }

  const { path } = await params;
  const upstream = `${pbUrl}/api/files/${path.join("/")}`;

  const res = await fetch(upstream, { cache: "no-store" });

  if (!res.ok) {
    return new NextResponse(null, { status: res.status });
  }

  const contentType = res.headers.get("content-type") ?? "application/octet-stream";
  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    status: 200,
    headers: {
      "content-type": contentType,
      "cache-control": "public, max-age=31536000, immutable",
    },
  });
}

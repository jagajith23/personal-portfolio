import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const playerTag = searchParams.get("playerTag");

  if (!playerTag) {
    return NextResponse.json(
      { error: "PlayerTag is required" },
      { status: 400 }
    );
  }

  const encodedTag = encodeURIComponent(playerTag);

  const response = await fetch(
    `https://api.clashroyale.com/v1/players/${encodedTag}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
      },
    }
  );

  if (!response.ok) {
    const text = await response.text();
    return NextResponse.json(
      {
        error: "Clash Royale API error",
        status: response.status,
        body: text || null,
      },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}

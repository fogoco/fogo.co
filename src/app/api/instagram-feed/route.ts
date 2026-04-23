import { NextResponse } from "next/server";

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp?: string;
};

const INSTAGRAM_ENDPOINT = "https://graph.instagram.com/me/media";

export async function GET() {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "Set INSTAGRAM_ACCESS_TOKEN in environment variables." },
      { status: 200 }
    );
  }

  const url = new URL(INSTAGRAM_ENDPOINT);
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp"
  );
  url.searchParams.set("limit", "12");
  url.searchParams.set("access_token", accessToken);

  try {
    const response = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Instagram API unavailable. Verify token permissions." },
        { status: 200 }
      );
    }

    const json = (await response.json()) as { data?: InstagramMedia[] };

    return NextResponse.json({
      items: (json.data ?? []).filter((item) => item.media_url || item.thumbnail_url),
    });
  } catch {
    return NextResponse.json(
      { error: "Could not fetch Instagram posts right now." },
      { status: 200 }
    );
  }
}

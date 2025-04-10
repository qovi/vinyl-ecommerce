import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { vinyls } from "@/server/db/schema";
import { like, or } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    
    if (!query || query.length < 2) {
      return NextResponse.json({ results: [] });
    }
    
    const searchTerm = `%${query}%`;
    
    const results = await db
      .select({
        id: vinyls.id,
        name: vinyls.name,
        artist: vinyls.artist,
        image: vinyls.image,
        price: vinyls.price,
      })
      .from(vinyls)
      .where(
        or(
          like(vinyls.name, searchTerm),
          like(vinyls.artist, searchTerm)
        )
      )
      .limit(5);
    
    return NextResponse.json({ results }, {
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      }
    });
  } catch (error) {
    console.error("Søgefejl:", error);
    return NextResponse.json({ results: [], error: "Fejl ved søgning" }, { status: 500 });
  }
} 
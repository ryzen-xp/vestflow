import { NextResponse } from "next/server";
import { getDb } from "@/indexer/src/db";

export async function GET(): Promise<NextResponse> {
  try {
    const db = getDb();
    db.prepare("SELECT 1").get();

    const status = {
      ok: true,
      timestamp: new Date().toISOString(),
      checks: {
        database: "healthy",
      },
    };

    return NextResponse.json(status, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        ok: false,
        timestamp: new Date().toISOString(),
        error: "Database unavailable",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

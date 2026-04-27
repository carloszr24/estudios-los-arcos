import { NextRequest, NextResponse } from "next/server";
import { computeAvailabilityFromStorage } from "@/lib/reservations";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const checkin = request.nextUrl.searchParams.get("checkin");
  const checkout = request.nextUrl.searchParams.get("checkout");

  if (!checkin || !checkout) {
    return NextResponse.json({ error: "checkin y checkout son obligatorios" }, { status: 400 });
  }

  if (checkout <= checkin) {
    return NextResponse.json({ error: "checkout debe ser mayor que checkin" }, { status: 400 });
  }

  const availability = await computeAvailabilityFromStorage(checkin, checkout);
  return NextResponse.json(availability);
}


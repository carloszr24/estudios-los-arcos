import { NextRequest, NextResponse } from "next/server";
import { createReservation, getReservations } from "@/lib/reservations";

export const runtime = "nodejs";

type Body = {
  checkin?: string;
  checkout?: string;
  adults?: number;
  children?: number;
  rooms?: number;
  guestName?: string;
  guestEmail?: string;
  guestPhone?: string;
  notes?: string;
};

export async function GET() {
  const reservations = await getReservations();
  const sorted = [...reservations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  return NextResponse.json(sorted);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Body;

  if (!body.checkin || !body.checkout || !body.guestName || !body.guestEmail || !body.guestPhone) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  if (body.checkout <= body.checkin) {
    return NextResponse.json({ error: "La salida debe ser posterior a la entrada" }, { status: 400 });
  }

  const adults = Number(body.adults ?? 2);
  const children = Number(body.children ?? 0);
  const rooms = Number(body.rooms ?? 1);

  if (Number.isNaN(adults) || Number.isNaN(children) || Number.isNaN(rooms) || adults < 1 || children < 0 || rooms < 1) {
    return NextResponse.json({ error: "Valores de ocupacion no validos" }, { status: 400 });
  }

  try {
    const created = await createReservation({
      checkin: body.checkin,
      checkout: body.checkout,
      adults,
      children,
      rooms,
      guestName: body.guestName.trim(),
      guestEmail: body.guestEmail.trim(),
      guestPhone: body.guestPhone.trim(),
      notes: body.notes?.trim(),
    });
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "No se pudo crear la reserva";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}


import { promises as fs } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

export type Reservation = {
  id: string;
  checkin: string;
  checkout: string;
  adults: number;
  children: number;
  rooms: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  notes?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
};

export type AvailabilityResult = {
  available: boolean;
  roomsLeft: number;
  totalRooms: number;
};

const TOTAL_ROOMS = 4;
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "reservations.json");

async function ensureStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, "[]", "utf8");
  }
}

async function readReservations(): Promise<Reservation[]> {
  await ensureStorage();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw) as Reservation[];
}

async function writeReservations(reservations: Reservation[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(reservations, null, 2), "utf8");
}

function overlaps(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && bStart < aEnd;
}

export async function getReservations() {
  return readReservations();
}

export async function createReservation(
  payload: Omit<Reservation, "id" | "createdAt" | "status">,
): Promise<{ reservation: Reservation; availability: AvailabilityResult }> {
  const reservations = await readReservations();
  const availability = computeAvailability(reservations, payload.checkin, payload.checkout);
  if (!availability.available || payload.rooms > availability.roomsLeft) {
    throw new Error("No hay suficientes habitaciones disponibles para esas fechas.");
  }

  const reservation: Reservation = {
    ...payload,
    id: randomUUID(),
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  reservations.push(reservation);
  await writeReservations(reservations);
  return { reservation, availability: computeAvailability(reservations, payload.checkin, payload.checkout) };
}

export async function computeAvailabilityFromStorage(checkin: string, checkout: string) {
  const reservations = await readReservations();
  return computeAvailability(reservations, checkin, checkout);
}

export function computeAvailability(reservations: Reservation[], checkin: string, checkout: string): AvailabilityResult {
  const bookedRooms = reservations
    .filter((reservation) => reservation.status !== "cancelled")
    .filter((reservation) => overlaps(checkin, checkout, reservation.checkin, reservation.checkout))
    .reduce((sum, reservation) => sum + reservation.rooms, 0);

  const roomsLeft = Math.max(0, TOTAL_ROOMS - bookedRooms);
  return {
    available: roomsLeft > 0,
    roomsLeft,
    totalRooms: TOTAL_ROOMS,
  };
}


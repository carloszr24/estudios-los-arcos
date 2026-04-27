import { getReservations } from "@/lib/reservations";
import type { CSSProperties } from "react";

type AdminPageProps = {
  searchParams: Promise<{ key?: string }>;
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;
  const expectedKey = process.env.ADMIN_PASSWORD;

  if (!expectedKey || params.key !== expectedKey) {
    return (
      <main style={{ padding: "32px", fontFamily: "var(--font-inter), Arial, sans-serif" }}>
        <h1 style={{ marginBottom: "10px" }}>Panel de reservas</h1>
        <p style={{ color: "#555", marginBottom: "14px" }}>
          Acceso restringido. Usa <code>/admin?key=TU_CLAVE</code>.
        </p>
        <p style={{ color: "#777" }}>
          Define <code>ADMIN_PASSWORD</code> en variables de entorno para proteger el panel.
        </p>
      </main>
    );
  }

  const reservations = await getReservations();
  const rows = [...reservations].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main style={{ padding: "32px", fontFamily: "var(--font-inter), Arial, sans-serif" }}>
      <h1 style={{ marginBottom: "8px" }}>Panel de reservas</h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>Total reservas: {rows.length}</p>
      <div style={{ overflowX: "auto", border: "1px solid #e6e6e6", borderRadius: "8px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "920px" }}>
          <thead>
            <tr style={{ background: "#fafafa", textAlign: "left" }}>
              <th style={cellHead}>Fecha</th>
              <th style={cellHead}>Cliente</th>
              <th style={cellHead}>Contacto</th>
              <th style={cellHead}>Estancia</th>
              <th style={cellHead}>Ocupacion</th>
              <th style={cellHead}>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((reservation) => (
              <tr key={reservation.id}>
                <td style={cellBody}>{new Date(reservation.createdAt).toLocaleString("es-ES")}</td>
                <td style={cellBody}>{reservation.guestName}</td>
                <td style={cellBody}>
                  {reservation.guestEmail}
                  <br />
                  {reservation.guestPhone}
                </td>
                <td style={cellBody}>
                  {reservation.checkin} a {reservation.checkout}
                </td>
                <td style={cellBody}>
                  {reservation.adults}A / {reservation.children}N / {reservation.rooms} Hab.
                </td>
                <td style={cellBody}>{reservation.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const cellHead: CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #e6e6e6",
  fontSize: "12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  color: "#666",
};

const cellBody: CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid #f0f0f0",
  fontSize: "14px",
  color: "#222",
  verticalAlign: "top",
};


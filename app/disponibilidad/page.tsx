import Link from "next/link";

function formatDate(value: string) {
  if (!value) return "Sin fecha";
  const [y, m, d] = value.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

const DEMO_ROOMS = [
  {
    id: "doble",
    name: "Habitación Doble",
    price: "76,00€ / noche",
    status: "Disponible",
    statusClass: "available",
    meta: "Incluye WiFi gratis y cancelación flexible",
  },
  {
    id: "estudio",
    name: "Apartamento Estudio",
    price: "84,00€ / noche",
    status: "Disponible",
    statusClass: "available",
    meta: "Más reservado hoy por parejas",
  },
  {
    id: "familiar",
    name: "Habitación Familiar",
    price: "92,00€ / noche",
    status: "Quedan pocas unidades",
    statusClass: "few-left",
    meta: "Ideal para familias de hasta 4 personas",
  },
] as const;

type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function DisponibilidadPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const params = new URLSearchParams();

  Object.entries(resolvedSearchParams).forEach(([key, value]) => {
    if (typeof value === "string") {
      params.set(key, value);
    }
  });

  const checkin = params.get("checkin") ?? "";
  const checkout = params.get("checkout") ?? "";
  const adults = Number(params.get("group_adults") ?? 2);
  const children = Number(params.get("group_children") ?? 0);
  const rooms = Number(params.get("no_rooms") ?? 1);

  return (
    <main className="availability-demo-page">
      <section className="availability-demo-card">
        <p className="availability-demo-badge">Vista demo para cliente</p>
        <h1>Disponibilidad en Estudios Los Arcos</h1>
        <p className="availability-demo-subtitle">
          Esta pantalla es una demo visual de disponibilidad para la presentación.
        </p>

        <div className="availability-demo-summary">
          <div>
            <span>Entrada</span>
            <strong>{formatDate(checkin)}</strong>
          </div>
          <div>
            <span>Salida</span>
            <strong>{formatDate(checkout)}</strong>
          </div>
          <div>
            <span>Huéspedes</span>
            <strong>
              {adults} adulto{adults !== 1 ? "s" : ""}
              {children > 0 ? ` · ${children} niño${children !== 1 ? "s" : ""}` : ""}
            </strong>
          </div>
          <div>
            <span>Habitaciones</span>
            <strong>{rooms}</strong>
          </div>
        </div>

        <div className="availability-demo-alerts">
          <p className="availability-demo-urgency">
            Solo quedan <strong>2 estudios</strong> para estas fechas.
          </p>
          <p className="availability-demo-offer">
            Oferta demo de hoy: <strong>-10%</strong> reservando ahora.
          </p>
        </div>

        <div className="availability-demo-grid">
          {DEMO_ROOMS.map((room) => (
            <article className="availability-demo-room" key={room.id}>
              <h2>{room.name}</h2>
              <p className={`availability-demo-status ${room.statusClass}`}>{room.status}</p>
              <p className="availability-demo-price">
                <span>Precio estimado desde</span> {room.price}
              </p>
              <p className="availability-demo-meta">{room.meta}</p>
              <form action="/reserva" method="get" className="availability-select-form">
                {Array.from(params.entries()).map(([key, value]) => (
                  <input key={`${room.id}-${key}`} type="hidden" name={key} value={value} />
                ))}
                <input type="hidden" name="room_id" value={room.id} />
                <input type="hidden" name="room_name" value={room.name} />
                <input type="hidden" name="room_price" value={room.price} />
                <button type="submit" className="availability-select-btn">
                  Seleccionar apartamento
                </button>
              </form>
            </article>
          ))}
        </div>

        <div className="availability-demo-actions">
          <Link href="/" className="availability-demo-secondary">
            Modificar búsqueda
          </Link>
          <span className="availability-demo-primary is-disabled">Paso 2: Datos de reserva</span>
        </div>
      </section>
    </main>
  );
}

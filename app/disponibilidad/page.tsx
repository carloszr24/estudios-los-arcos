import Link from "next/link";

const BOOKING_HOTEL_URL = "https://www.booking.com/hotel/es/estudios-los-arcos.es.html";
const BOOKING_AVAILABILITY_ANCHOR = "group_recommendation";

function buildBookingAvailabilityUrl(params: URLSearchParams) {
  const query = params.toString();
  return `${BOOKING_HOTEL_URL}${query ? `?${query}` : ""}#${BOOKING_AVAILABILITY_ANCHOR}`;
}

function formatDate(value: string) {
  if (!value) return "Sin fecha";
  const [y, m, d] = value.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

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
  const bookingUrl = buildBookingAvailabilityUrl(params);

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
          <article className="availability-demo-room">
            <h2>Habitación Doble</h2>
            <p className="availability-demo-status available">Disponible</p>
            <p className="availability-demo-price">
              <span>Precio estimado desde</span> 76,00€ / noche
            </p>
            <p className="availability-demo-meta">Incluye WiFi gratis y cancelación flexible</p>
          </article>

          <article className="availability-demo-room">
            <h2>Apartamento Estudio</h2>
            <p className="availability-demo-status available">Disponible</p>
            <p className="availability-demo-price">
              <span>Precio estimado desde</span> 84,00€ / noche
            </p>
            <p className="availability-demo-meta">Más reservado hoy por parejas</p>
          </article>

          <article className="availability-demo-room">
            <h2>Habitación Familiar</h2>
            <p className="availability-demo-status few-left">Quedan pocas unidades</p>
            <p className="availability-demo-price">
              <span>Precio estimado desde</span> 92,00€ / noche
            </p>
            <p className="availability-demo-meta">Ideal para familias de hasta 4 personas</p>
          </article>
        </div>

        <div className="availability-demo-actions">
          <Link href="/" className="availability-demo-secondary">
            Modificar búsqueda
          </Link>
          <a href={bookingUrl} className="availability-demo-primary" target="_blank" rel="noreferrer">
            Continuar en Booking
          </a>
        </div>
      </section>
    </main>
  );
}

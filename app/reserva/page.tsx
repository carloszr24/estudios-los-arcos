import Link from "next/link";

type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function getParam(value: string | string[] | undefined, fallback = "") {
  if (typeof value === "string") return value;
  return fallback;
}

export default async function ReservaPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const params = await searchParams;
  const roomName = getParam(params.room_name, "Apartamento Estudio");
  const roomPrice = getParam(params.room_price, "84,00€ / noche");
  const checkin = getParam(params.checkin);
  const checkout = getParam(params.checkout);
  const adults = getParam(params.group_adults, "2");
  const children = getParam(params.group_children, "0");
  const noRooms = getParam(params.no_rooms, "1");

  return (
    <main className="booking-flow-page">
      <section className="booking-flow-card">
        <p className="availability-demo-badge">Paso 2 de 3</p>
        <h1>Completa tu reserva</h1>
        <p className="booking-flow-subtitle">Rellena los datos para continuar al pago ficticio de la demo.</p>

        <div className="booking-flow-room">
          <h2>{roomName}</h2>
          <p>{roomPrice}</p>
        </div>

        <form action="/pago-demo" method="get" className="booking-flow-form">
          <div className="booking-form-grid">
            <label>
              Nombre completo
              <input type="text" name="guest_name" required placeholder="Ej: María López" />
            </label>
            <label>
              Email
              <input type="email" name="guest_email" required placeholder="maria@email.com" />
            </label>
            <label>
              Teléfono
              <input type="tel" name="guest_phone" required placeholder="+34 600 000 000" />
            </label>
            <label>
              Adultos
              <input type="number" name="group_adults" min={1} defaultValue={adults} required />
            </label>
            <label>
              Niños
              <input type="number" name="group_children" min={0} defaultValue={children} required />
            </label>
            <label>
              Habitaciones
              <input type="number" name="no_rooms" min={1} defaultValue={noRooms} required />
            </label>
            <label>
              Fecha entrada
              <input type="date" name="checkin" defaultValue={checkin} required />
            </label>
            <label>
              Fecha salida
              <input type="date" name="checkout" defaultValue={checkout} required />
            </label>
          </div>

          <label>
            Peticiones especiales (demo)
            <textarea
              name="notes"
              rows={4}
              placeholder="Llegada aproximada, preferencia de cama, etc."
              className="booking-flow-notes"
            />
          </label>

          <input type="hidden" name="room_name" value={roomName} />
          <input type="hidden" name="room_price" value={roomPrice} />

          <div className="booking-flow-actions">
            <Link href="/disponibilidad" className="availability-demo-secondary">
              Volver a disponibilidad
            </Link>
            <button type="submit" className="availability-demo-primary booking-flow-submit">
              Ir al pago ficticio
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

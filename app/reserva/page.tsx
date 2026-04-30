import Link from "next/link";

type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
const ROOM_OPTIONS = [
  { id: "doble", name: "Habitación Doble", price: "76,00€ / noche", meta: "Cama doble y baño privado" },
  { id: "estudio", name: "Apartamento Estudio", price: "84,00€ / noche", meta: "Cocina privada y vistas" },
  { id: "familiar", name: "Habitación Familiar", price: "92,00€ / noche", meta: "Ideal para familias de hasta 4 personas" },
] as const;

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
  const requestedRoomId = getParam(params.room_id, "");
  const selectedRoom =
    ROOM_OPTIONS.find((room) => room.id === requestedRoomId) ??
    ROOM_OPTIONS.find((room) => room.name === getParam(params.room_name, "")) ??
    ROOM_OPTIONS[1];
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
        <p className="booking-flow-subtitle">Rellena tus datos para continuar al pago seguro.</p>

        <form action="/pago" method="get" className="booking-flow-form">
          <div className="booking-room-options" role="radiogroup" aria-label="Selecciona apartamento">
            {ROOM_OPTIONS.map((room) => (
              <label className="booking-room-option" key={room.id}>
                <input type="radio" name="room_id" value={room.id} defaultChecked={room.id === selectedRoom.id} />
                <span className="booking-room-option-name">{room.name}</span>
                <span className="booking-room-option-price">{room.price}</span>
                <span className="booking-room-option-meta">{room.meta}</span>
              </label>
            ))}
          </div>

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
            Peticiones especiales
            <textarea
              name="notes"
              rows={4}
              placeholder="Llegada aproximada, preferencia de cama, etc."
              className="booking-flow-notes"
            />
          </label>

          <div className="booking-flow-actions">
            <Link href="/disponibilidad" className="availability-demo-secondary">
              Volver a disponibilidad
            </Link>
            <button type="submit" className="availability-demo-primary booking-flow-submit">
              Ir al pago
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

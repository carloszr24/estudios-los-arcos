import Link from "next/link";

type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function getParam(value: string | string[] | undefined, fallback = "") {
  if (typeof value === "string") return value;
  return fallback;
}

export default async function PagoDemoPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const params = await searchParams;
  const roomName = getParam(params.room_name, "Apartamento Estudio");
  const roomPrice = getParam(params.room_price, "84,00€ / noche");
  const guestName = getParam(params.guest_name, "Cliente demo");
  const guestEmail = getParam(params.guest_email, "cliente@demo.com");
  const checkin = getParam(params.checkin);
  const checkout = getParam(params.checkout);

  return (
    <main className="booking-flow-page">
      <section className="booking-flow-card">
        <p className="availability-demo-badge">Paso 3 de 3</p>
        <h1>Pago ficticio</h1>
        <p className="booking-flow-subtitle">Pantalla demo para mostrar el último paso del proceso de reserva.</p>

        <div className="payment-demo-summary">
          <p>
            <strong>Apartamento:</strong> {roomName}
          </p>
          <p>
            <strong>Precio:</strong> {roomPrice}
          </p>
          <p>
            <strong>Cliente:</strong> {guestName} ({guestEmail})
          </p>
          <p>
            <strong>Fechas:</strong> {checkin || "sin fecha"} - {checkout || "sin fecha"}
          </p>
        </div>

        <div className="payment-demo-methods">
          <label>
            <input type="radio" name="payment_method" defaultChecked readOnly /> Tarjeta (ficticia)
          </label>
          <label>
            <input type="radio" name="payment_method" readOnly /> Bizum (ficticio)
          </label>
          <label>
            <input type="radio" name="payment_method" readOnly /> Transferencia (ficticia)
          </label>
        </div>

        <div className="booking-flow-actions">
          <Link href="/reserva" className="availability-demo-secondary">
            Volver al formulario
          </Link>
          <button type="button" className="availability-demo-primary booking-flow-submit">
            Confirmar pago ficticio
          </button>
        </div>
      </section>
    </main>
  );
}

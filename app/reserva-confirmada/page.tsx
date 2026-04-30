import Link from "next/link";

type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function getParam(value: string | string[] | undefined, fallback = "") {
  if (typeof value === "string") return value;
  return fallback;
}

export default async function ReservaConfirmadaPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const params = await searchParams;
  const roomName = getParam(params.room_name, "Apartamento Estudio");
  const checkin = getParam(params.checkin, "sin fecha");
  const checkout = getParam(params.checkout, "sin fecha");
  const guestName = getParam(params.guest_name, "Huésped");

  return (
    <main className="booking-flow-page">
      <section className="booking-flow-card confirmation-card">
        <p className="availability-demo-badge">Reserva completada</p>
        <h1>Tu reserva está confirmada</h1>
        <p className="booking-flow-subtitle">
          Gracias, {guestName}. Hemos enviado un correo de confirmación con todos los detalles.
        </p>

        <div className="payment-demo-summary">
          <p>
            <strong>Apartamento:</strong> {roomName}
          </p>
          <p>
            <strong>Entrada:</strong> {checkin}
          </p>
          <p>
            <strong>Salida:</strong> {checkout}
          </p>
          <p>
            <strong>Localizador:</strong> ELA-{Math.floor(100000 + Math.random() * 900000)}
          </p>
        </div>

        <div className="booking-flow-actions">
          <Link href="/" className="availability-demo-primary">
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}

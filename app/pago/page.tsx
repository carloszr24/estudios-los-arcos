"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PageSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

function getParam(value: string | string[] | undefined, fallback = "") {
  if (typeof value === "string") return value;
  return fallback;
}

export default function PagoPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const router = useRouter();
  const params = use(searchParams);
  const [isProcessing, setIsProcessing] = useState(false);

  const { roomName, roomPrice, guestName, guestEmail, checkin, checkout, confirmationQuery } = useMemo(() => {
    const roomName = getParam(params.room_name, "Apartamento Estudio");
    const roomPrice = getParam(params.room_price, "84,00€ / noche");
    const guestName = getParam(params.guest_name, "Cliente");
    const guestEmail = getParam(params.guest_email, "cliente@email.com");
    const checkin = getParam(params.checkin);
    const checkout = getParam(params.checkout);

    const confirmationParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "string") confirmationParams.set(key, value);
    });

    return {
      roomName,
      roomPrice,
      guestName,
      guestEmail,
      checkin,
      checkout,
      confirmationQuery: confirmationParams.toString(),
    };
  }, [params]);

  const handleConfirmPayment = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    setTimeout(() => {
      router.push(`/reserva-confirmada${confirmationQuery ? `?${confirmationQuery}` : ""}`);
    }, 1800);
  };

  return (
    <main className="booking-flow-page">
      <section className="booking-flow-card">
        <p className="availability-demo-badge">Paso 3 de 3</p>
        <h1>Pago seguro</h1>
        <p className="booking-flow-subtitle">Revisa tu reserva y confirma el pago para finalizar.</p>

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
            <input type="radio" name="payment_method" defaultChecked readOnly /> Tarjeta
          </label>
          <label>
            <input type="radio" name="payment_method" readOnly /> Bizum
          </label>
          <label>
            <input type="radio" name="payment_method" readOnly /> Transferencia
          </label>
        </div>

        <div className="booking-flow-actions">
          <Link href="/reserva" className="availability-demo-secondary">
            Volver al formulario
          </Link>
          <button
            type="button"
            className="availability-demo-primary booking-flow-submit"
            onClick={handleConfirmPayment}
            disabled={isProcessing}
          >
            {isProcessing ? "Procesando pago..." : "Confirmar pago"}
          </button>
        </div>
      </section>
    </main>
  );
}

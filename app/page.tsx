"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const BOOKING_HOTEL_URL = "https://www.booking.com/hotel/es/estudios-los-arcos.es.html";
const BOOKING_AVAILABILITY_ANCHOR = "group_recommendation";
const BOOKING_DEST_ID = "-404164";
const REVIEWS = [
  {
    author: "Xsanz",
    country: "España",
    date: "19 abril 2026",
    type: "En familia",
    score: 10,
    title: "Excepcional",
    text: "La ubicación es perfecta para visitar Teruel, a 10 minutos andando del centro. Fuimos 2 adultos y 2 niñas y estuvimos muy cómodos.",
  },
  {
    author: "Ruben",
    country: "España",
    date: "5 abril 2026",
    type: "En familia",
    score: 10,
    title: "Excepcional",
    text: "Hemos pasado unos días en familia estupendos, la ubicación y las instalaciones son excelentes. Para repetir sin duda.",
  },
  {
    author: "Lisa",
    country: "España",
    date: "3 abril 2026",
    type: "En pareja",
    score: 10,
    title: "Excelente",
    text: "Todo muy cómodo y limpio, además de cerca del centro turístico.",
  },
  {
    author: "Claudia",
    country: "España",
    date: "23 marzo 2026",
    type: "En familia",
    score: 10,
    title: "Genial",
    text: "Bien situado, anfitrión atento, check-in fácil y camas cómodas. Estuvimos como en casa.",
  },
  {
    author: "Celia",
    country: "España",
    date: "3 marzo 2026",
    type: "En familia",
    score: 10,
    title: "Excelente",
    text: "Todo limpio e impecable, ubicación de 10 y calidad-precio excelente. Si volvemos a Teruel repetiremos.",
  },
  {
    author: "Tomasz",
    country: "Polonia",
    date: "26 febrero 2026",
    type: "Viajero solo",
    score: 10,
    title: "Muy recomendable",
    text: "Ubicación excelente para Casco Antiguo y Universidad. Zona tranquila y anfitrión muy atento.",
  },
  {
    author: "Lidia",
    country: "España",
    date: "9 noviembre 2025",
    type: "En pareja",
    score: 10,
    title: "Todo genial",
    text: "Ubicación excelente y alojamiento tal como en las fotos, con todo muy limpio.",
  },
  {
    author: "David",
    country: "España",
    date: "11 septiembre 2025",
    type: "En grupo",
    score: 10,
    title: "Excepcional",
    text: "Muy buena ubicación, alojamiento limpio y muchas facilidades para guardar las bicicletas.",
  },
];

export default function Home() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isGuestsOpen, setIsGuestsOpen] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(REVIEWS.length);
  const [reviewTransition, setReviewTransition] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(2);
  const guestsPanelRef = useRef<HTMLDivElement>(null);
  const carouselReviews = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const handleBookingSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams();

    formData.forEach((value, key) => {
      if (typeof value === "string" && value.length > 0) {
        params.set(key, value);
      }
    });

    const bookingUrl = `${BOOKING_HOTEL_URL}?${params.toString()}#${BOOKING_AVAILABILITY_ANCHOR}`;
    const bookingWindow = window.open(bookingUrl, "_blank");
    if (bookingWindow) bookingWindow.opener = null;
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!guestsPanelRef.current) return;
      if (!guestsPanelRef.current.contains(event.target as Node)) {
        setIsGuestsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setReviewTransition(true);
      setReviewIndex((current) => current + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setCardsPerView(window.innerWidth < 900 ? 1 : 2);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goToPrevReview = () => {
    setReviewTransition(true);
    setReviewIndex((current) => current - 1);
  };

  const goToNextReview = () => {
    setReviewTransition(true);
    setReviewIndex((current) => current + 1);
  };

  const activeReviewIndex = ((reviewIndex % REVIEWS.length) + REVIEWS.length) % REVIEWS.length;

  const handleReviewTrackTransitionEnd = () => {
    if (reviewIndex >= REVIEWS.length * 2) {
      setReviewTransition(false);
      setReviewIndex(REVIEWS.length);
      return;
    }

    if (reviewIndex < REVIEWS.length) {
      setReviewTransition(false);
      setReviewIndex(REVIEWS.length * 2 - 1);
    }
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Image
            src="/images/logo-estudio-arcos.png"
            alt="Logo Estudios Los Arcos"
            width={230}
            height={70}
            className="brand-logo"
            priority
          />
        </div>
        <ul className="nav-links">
          <li>
            <a href="#alojamientos">Apartamentos</a>
          </li>
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#ubicacion">Ubicación</a>
          </li>
          <li>
            <a href="#galeria">Galería</a>
          </li>
          <li>
            <a href="#resenas">Opiniones</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
        <a href={BOOKING_HOTEL_URL} className="nav-reserve" target="_blank" rel="noreferrer">
          Reservar ahora
        </a>
      </nav>

      <section className="hero">
        <div className="hero-left">
          <h1 className="hero-title">
            Estudios
            <br />
            Los Arcos
          </h1>
          <p className="hero-sub">Apartamentos en Teruel</p>
          <div className="hero-tags">
            Cocina equipada <span>-</span> WiFi gratis <span>-</span> 10 min del centro
          </div>
          <form className="booking-form" onSubmit={handleBookingSubmit}>
            <input type="hidden" name="lang" value="es" />
            <input type="hidden" name="selected_currency" value="EUR" />
            <input type="hidden" name="do_availability_check" value="1" />
            <input type="hidden" name="hp_avform" value="1" />
            <input type="hidden" name="hp_group_set" value="0" />
            <input type="hidden" name="origin" value="hp" />
            <input type="hidden" name="src" value="hotel" />
            <input type="hidden" name="type" value="total" />
            <input type="hidden" name="sb_price_type" value="total" />
            <input type="hidden" name="dest_id" value={BOOKING_DEST_ID} />
            <input type="hidden" name="dest_type" value="city" />
            <input type="hidden" name="group_adults" value={adults} />
            <input type="hidden" name="group_children" value={children} />
            <input type="hidden" name="no_rooms" value={rooms} />
            <div className="bf-field">
              <div className="bf-label">Entrada</div>
              <input type="date" className="bf-input" name="checkin" />
            </div>
            <div className="bf-field">
              <div className="bf-label">Salida</div>
              <input type="date" className="bf-input" name="checkout" />
            </div>
            <div className="bf-field bf-field-popover" ref={guestsPanelRef}>
              <div className="bf-label">Huespedes</div>
              <button type="button" className="bf-trigger" onClick={() => setIsGuestsOpen((prev) => !prev)}>
                {adults} adultos {children > 0 ? `- ${children} niños` : ""}
              </button>
              {isGuestsOpen && (
                <div className="guest-popover">
                  <div className="guest-row">
                    <span>Adultos</span>
                    <div className="guest-controls">
                      <button type="button" onClick={() => setAdults((value) => Math.max(1, value - 1))}>
                        -
                      </button>
                      <strong>{adults}</strong>
                      <button type="button" onClick={() => setAdults((value) => Math.min(8, value + 1))}>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="guest-row">
                    <span>Ninos</span>
                    <div className="guest-controls">
                      <button type="button" onClick={() => setChildren((value) => Math.max(0, value - 1))}>
                        -
                      </button>
                      <strong>{children}</strong>
                      <button type="button" onClick={() => setChildren((value) => Math.min(6, value + 1))}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bf-field rooms">
              <div className="bf-label">Habitaciones</div>
              <select className="bf-select" value={rooms} onChange={(event) => setRooms(Number(event.target.value))}>
                <option value="1">1 habitación</option>
                <option value="2">2 habitaciones</option>
                <option value="3">3 habitaciones</option>
                <option value="4">4 habitaciones</option>
              </select>
            </div>
            <button type="submit" className="bf-btn">
              Buscar en Booking
            </button>
          </form>
          <div className="hero-actions">
            <a href="#alojamientos" className="btn-outline">
              Ver apartamentos
            </a>
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=80"
            alt="Apartamento Estudios Los Arcos"
          />
        </div>
      </section>

      <div className="value-bar">
        <div className="vb-item">
          <div className="vb-text">
            A 10 min
            <small>del centro</small>
          </div>
        </div>
        <div className="vb-item">
          <div className="vb-text">
            Cocina
            <small>equipada</small>
          </div>
        </div>
        <div className="vb-item">
          <div className="vb-text">
            WiFi
            <small>gratis</small>
          </div>
        </div>
        <div className="vb-item">
          <div className="vb-text">
            Habitaciones
            <small>familiares</small>
          </div>
        </div>
      </div>

      <section className="intro-wrap">
        <div className="intro reveal">
          <div className="intro-text">
            <p className="intro-eyebrow">Estudios funcionales</p>
            <h2 className="intro-title">
              Tu alojamiento practico
              <br />
              en Teruel
            </h2>
            <p>
              Estudios Los Arcos ofrece apartamentos funcionales con cocina equipada y todo lo necesario para que
              disfrutes de una estancia comoda y sin complicaciones.
            </p>
            <p>Ideales para viajes en pareja, en familia o por trabajo.</p>
            <a href="#alojamientos" className="btn-dark">
              Saber más
            </a>
          </div>
          <div className="intro-img reveal d2">
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" alt="Interior apartamento" />
          </div>
        </div>
      </section>

      <section className="alojamientos" id="alojamientos">
        <div className="section-header reveal">
          <p className="section-eyebrow">Nuestros alojamientos</p>
          <h2 className="section-title">Elige tu opción ideal</h2>
        </div>
        <div className="cards">
          {[
            ["Estudio", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"],
            ["Habitación familiar", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"],
            ["Habitacion doble", "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=600&q=80"],
          ].map(([title, image], index) => (
            <article key={title} className={`card reveal d${Math.min(index + 1, 3)}`}>
              <div className="card-img">
                <img src={image} alt={title} />
              </div>
              <div className="card-body">
                <div className="card-title">{title}</div>
                <ul className="card-features">
                  <li>1 cama doble + sofa cama</li>
                  <li>Cocina equipada</li>
                  <li>Bano privado</li>
                  <li>TV de pantalla plana</li>
                </ul>
                <a href={BOOKING_HOTEL_URL} className="btn-card" target="_blank" rel="noreferrer">
                  Reservar en Booking
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="ubicacion-section" id="ubicacion">
        <div className="ubicacion-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24331.98200953164!2d-1.1183267719870773!3d40.33130293773896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5e73320d7177a5%3A0xf2f0671726916355!2sEstudios%20los%20Arcos%20Teruel!5e0!3m2!1ses!2ses!4v1777302018786!5m2!1ses!2ses"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa de Estudios Los Arcos Teruel"
          />
        </div>
        <div className="ubicacion-content reveal">
          <p className="section-eyebrow">Ubicación</p>
          <h2 className="section-title">Cerca de todo, pero con tranquilidad</h2>
          <p className="ubicacion-text">
            A pocos minutos del centro histórico de Teruel, con acceso sencillo a pie y aparcamiento cercano en la zona.
          </p>
          <div className="ubicacion-chip">
            <strong>9,0</strong>
            <span>Valoración de ubicación · 511 comentarios</span>
          </div>
        </div>
      </section>

      <section className="servicios-section" id="servicios">
        <div className="servicios-inner reveal">
          <div className="servicios-head">
            <p className="section-eyebrow">Servicios</p>
            <h2 className="section-title">Todo lo necesario para una estancia cómoda</h2>
          </div>
          <div className="servicios-grid">
            {[
              "Cocina equipada",
              "WiFi gratis",
              "Aire acondicionado",
              "TV pantalla plana",
              "Accesible movilidad reducida",
              "Salón común",
              "Baño privado",
              "Habitaciones familiares",
            ].map((service) => (
              <div key={service} className="servicio-item">
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="entorno-section">
        <div className="entorno-inner reveal">
          <div className="entorno-text">
            <p className="section-eyebrow">Entorno</p>
            <h2 className="section-title">Descubre Teruel</h2>
            <p>
              Naturaleza, historia y cultura te esperan. Disfruta del senderismo, la nieve en invierno y del encanto de una
              ciudad con patrimonio único.
            </p>
            <div className="entorno-tags">
              <span>Senderismo</span>
              <span>Naturaleza</span>
              <span>Esquí</span>
              <span>Centro histórico</span>
            </div>
          </div>
          <div className="entorno-image">
            <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Entorno de Teruel" />
          </div>
        </div>
      </section>

      <section className="resenas" id="resenas">
        <div className="resenas-inner">
          <div className="resenas-grid reveal">
            <div className="rating-big booking-rating">
              <Image
                src="/images/booking-logo.png"
                alt="Booking.com"
                width={160}
                height={28}
                className="booking-logo"
              />
              <div className="rating-big-num">8,5</div>
              <div className="rating-label">Muy bien</div>
              <div className="rating-count">511 comentarios</div>
            </div>
            <div className="reviews-carousel">
              <div
                className={`reviews-track ${reviewTransition ? "" : "no-transition"}`}
                style={{ transform: `translateX(-${reviewIndex * (100 / cardsPerView)}%)` }}
                onTransitionEnd={handleReviewTrackTransitionEnd}
              >
                {carouselReviews.map((review, index) => (
                  <div
                    className="review-slide"
                    key={`${review.author}-${review.date}-${index}`}
                    style={{ width: `${100 / cardsPerView}%` }}
                  >
                    <article className="review-card">
                      <div className="review-meta">
                        <span className="review-badge">{review.title}</span>
                      </div>
                      <p className="review-text">{review.text}</p>
                      <div className="review-author">
                        {review.author}, {review.country}
                      </div>
                      <div className="review-submeta">
                        {review.type} - {review.date}
                      </div>
                      <img
                        src="/images/rating-number.png"
                        alt="Valoración 10"
                        className="review-score-image"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    </article>
                  </div>
                ))}
              </div>
              <div className="review-controls">
                <button type="button" className="review-nav-btn" onClick={goToPrevReview} aria-label="Reseña anterior">
                  ‹
                </button>
                <div className="review-dots">
                  {REVIEWS.map((review, index) => (
                    <button
                      type="button"
                      key={review.author + review.date}
                      className={`review-dot ${index === activeReviewIndex ? "active" : ""}`}
                      onClick={() => {
                        setReviewTransition(true);
                        setReviewIndex(REVIEWS.length + index);
                      }}
                      aria-label={`Ir a reseña ${index + 1}`}
                    />
                  ))}
                </div>
                <button type="button" className="review-nav-btn" onClick={goToNextReview} aria-label="Reseña siguiente">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-final" id="cta">
        <div className="cta-text">
          <div className="cta-text-main">Todo listo para tu estancia en Teruel</div>
          <div className="cta-text-sub">Apartamentos funcionales con todo lo que necesitas.</div>
        </div>
        <a href={BOOKING_HOTEL_URL} className="cta-btn" target="_blank" rel="noreferrer">
          Reservar en Booking
        </a>
      </section>

      <footer className="footer-nav" id="contacto">
        <div className="footer-brand">
          <Image
            src="/images/logo-estudio-arcos.png"
            alt="Logo Estudios Los Arcos"
            width={120}
            height={36}
            className="footer-brand-logo"
          />
          <div className="footer-logo-text">ESTUDIOS LOS ARCOS</div>
        </div>
        <ul className="footer-links">
          <li>
            <a href="#alojamientos">Apartamentos</a>
          </li>
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#ubicacion">Ubicación</a>
          </li>
          <li>
            <a href="#resenas">Opiniones</a>
          </li>
        </ul>
      </footer>
    </>
  );
}

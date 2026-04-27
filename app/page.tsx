"use client";

import { useEffect } from "react";

const BOOKING_URL = "https://www.booking.com/";

export default function Home() {
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

  return (
    <>
      <nav>
        <div className="nav-logo">
          <div className="nav-logo-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div className="nav-logo-text">
            ESTUDIOS
            <br />
            <span>LOS ARCOS</span>
          </div>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#alojamientos">Apartamentos</a>
          </li>
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#ubicacion">Ubicacion</a>
          </li>
          <li>
            <a href="#galeria">Galeria</a>
          </li>
          <li>
            <a href="#resenas">Opiniones</a>
          </li>
          <li>
            <a href="#contacto">Contacto</a>
          </li>
        </ul>
        <a href={BOOKING_URL} className="nav-reserve" target="_blank" rel="noreferrer">
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
          <div className="booking-form">
            <div className="bf-field">
              <div className="bf-label">Entrada</div>
              <input type="date" className="bf-input" />
            </div>
            <div className="bf-field">
              <div className="bf-label">Salida</div>
              <input type="date" className="bf-input" />
            </div>
            <div className="bf-field guests">
              <div className="bf-label">Huespedes</div>
              <select className="bf-select" defaultValue="2 adultos">
                <option>1 adulto</option>
                <option>2 adultos</option>
                <option>3 adultos</option>
                <option>4 adultos</option>
              </select>
            </div>
            <a href={BOOKING_URL} className="bf-btn" target="_blank" rel="noreferrer">
              Ver disponibilidad
            </a>
          </div>
          <a href="#alojamientos" className="btn-outline">
            Ver apartamentos
          </a>
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
              Saber mas
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
          <h2 className="section-title">Elige tu opcion ideal</h2>
        </div>
        <div className="cards">
          {[
            ["Estudio", "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"],
            ["Habitacion familiar", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80"],
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
                <a href={BOOKING_URL} className="btn-card" target="_blank" rel="noreferrer">
                  Reservar en Booking
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="resenas" id="resenas">
        <div className="resenas-inner">
          <div className="resenas-header reveal">
            <p className="section-eyebrow">Lo que dicen nuestros huespedes</p>
          </div>
          <div className="resenas-grid reveal">
            <div className="rating-big">
              <div className="rating-big-num">8.5</div>
              <div className="rating-label">Muy bien</div>
              <div className="rating-count">511 comentarios</div>
            </div>
            <div className="review-card d1">
              <p className="review-text">La ubicacion es perfecta para visitar Teruel, muy cerca del centro y en una zona tranquila.</p>
              <div className="review-author">Maribel, Espana</div>
            </div>
            <div className="review-card d2">
              <p className="review-text">Estudio comodo, limpio y con todo lo necesario. Ideal para viajar en familia.</p>
              <div className="review-author">Xsanz, Espana</div>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-final" id="cta">
        <div className="cta-text">
          <div className="cta-text-main">Todo listo para tu estancia en Teruel</div>
          <div className="cta-text-sub">Apartamentos funcionales con todo lo que necesitas.</div>
        </div>
        <a href={BOOKING_URL} className="cta-btn" target="_blank" rel="noreferrer">
          Reservar en Booking
        </a>
      </section>

      <footer className="footer-nav" id="contacto">
        <div className="footer-logo-text">ESTUDIOS LOS ARCOS</div>
        <ul className="footer-links">
          <li>
            <a href="#alojamientos">Apartamentos</a>
          </li>
          <li>
            <a href="#servicios">Servicios</a>
          </li>
          <li>
            <a href="#ubicacion">Ubicacion</a>
          </li>
          <li>
            <a href="#resenas">Opiniones</a>
          </li>
        </ul>
      </footer>
    </>
  );
}

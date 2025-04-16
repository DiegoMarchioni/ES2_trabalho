import React from 'react';
import '../style/reservationSection.css';

function ReservationSection() {
  return (
    <section id="reservas" className="reservation-section">
      <h2>Faça sua Reserva</h2>
      <p>Reserve sua mesa para uma experiência única na nossa pizzaria.</p>
      <a href="/reservas" className="btn-primary">Reservar Agora</a>
    </section>
  );
}

export default ReservationSection;

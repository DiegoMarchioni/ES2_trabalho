// Home.js corrigido
import React from 'react';
import MenuSection from '../components/menuSection';
import ReservationSection from '../components/reservationSection';
import TestimonialSection from '../components/testimonialSection';
import '../style/home.css';

function Home() {
  return (
    <main className="home-page">
      <MenuSection />
      <ReservationSection />
      <TestimonialSection />
    </main>
  );
}

export default Home;

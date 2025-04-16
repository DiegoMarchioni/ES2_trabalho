import React from 'react';
import '../style/testimonialSection.css';

function TestimonialSection() {
  return (
    <section id="depoimentos" className="testimonial-section">
      <h2>O que dizem nossos clientes</h2>
      <div className="testimonials">
        <div className="testimonial">
          <p>"A melhor pizza que já provei! Atendimento impecável e ambiente acolhedor."</p>
          <h4>João Silva</h4>
        </div>
        <div className="testimonial">
          <p>"Uma experiência gastronômica única, com um toque de tradição napolitana."</p>
          <h4>Maria Souza</h4>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;

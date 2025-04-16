import React from 'react';
import '../style/galeria.css'; // Caso queira aplicar estilos específicos

function Galeria() {
  return (
    <section className="galeria-page">
      <h2>Galeria de Fotos</h2>
      <p>Confira alguns momentos deliciosos na Speranza!</p>

      <div className="galeria-grid">
        <img src="/assets/galeria1.jpg" alt="Pizza tradicional" />
        <img src="/assets/galeria2.jpg" alt="Ambiente interno" />
        <img src="/assets/galeria3.jpg" alt="Equipe da cozinha" />
        <img src="/assets/galeria4.jpg" alt="Cliente feliz" />
      </div>
    </section>
  );
}

export default Galeria;

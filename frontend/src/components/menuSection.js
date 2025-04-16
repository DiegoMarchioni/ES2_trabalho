// src/components/MenuSection.js
import React from 'react';
import '../style/menuSection.css';

function MenuSection() {
  return (
    <section id="cardapio" className="menu-section">
      <h2>Destaques do Cardápio</h2>
      <div className="cardapio-items">
        <div className="cardapio-item">
          <img src="https://via.placeholder.com/300x200?text=Margherita" alt="Pizza Margherita" />
          <h3>Pizza Margherita</h3>
          <p>O ícone da verdadeira pizza napolitana, com molho de tomate, mussarela de búfala e manjericão.</p>
          <a href="/cardapio/margherita" className="btn-secondary">Saiba Mais</a>
        </div>
        <div className="cardapio-item">
          <img src="https://via.placeholder.com/300x200?text=Tortano" alt="Tortano" />
          <h3>Tortano</h3>
          <p>Receita tradicional de pão de linguiça napolitana, generosamente recheado e macio.</p>
          <a href="/cardapio/tortano" className="btn-secondary">Saiba Mais</a>
        </div>
        <div className="cardapio-item">
          <img src="https://via.placeholder.com/300x200?text=Pastiera" alt="Pastiera di Grano" />
          <h3>Pastiera di Grano</h3>
          <p>Receita exclusiva da família, um clássico que une tradição e sabor incomparável.</p>
          <a href="/cardapio/pastiera" className="btn-secondary">Saiba Mais</a>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;

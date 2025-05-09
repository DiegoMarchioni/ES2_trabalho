// src/components/MenuSection.js
import React, { useEffect, useState } from 'react';
import '../style/menuSection.css';

function MenuSection() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/dishes')
      .then(response => response.json())
      .then(data => setDishes(data))
      .catch(error => console.error('Erro ao buscar pratos:', error));
  }, []);

  return (
    <section id="cardapio" className="menu-section">
      <h2>Destaques do Cardápio</h2>
      <div className="cardapio-items">
        {dishes.map(dish => (
          <div key={dish.id} className="cardapio-item">
            <img
              src={`https://pizzapoint.com.br/wp-content/uploads/2024/05/pizza.png`}
              alt={dish.name}
            />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p><strong>R$ {dish.price.toFixed(2)}</strong></p>
            <a href={`/cardapio/`} className="btn-secondary">Saiba Mais</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuSection;

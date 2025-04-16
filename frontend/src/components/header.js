// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../logo.svg';
import '../style/header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="logo">
          <img src={logoImage} alt="Pizzaria Speranza" />
        </div>
        <nav className="menu">
          <ul>
            <li><Link to="/cardapio">Cardapio</Link></li>
            <li><Link to="/reservas">Reservas</Link></li>
            <li><Link to="/sobre">Sobre</Link></li>
            <li><Link to="/galeria">Galeria</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

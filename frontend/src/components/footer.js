import React from 'react';
import '../style/footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-info">
        <p>&copy; 2025 Pizzaria Speranza. Todos os direitos reservados.</p>
        <p>
          Central Delivery: <a href="tel:1150511229">(11) 5051-1229</a>
        </p>
        <div className="social-media">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://wa.me" target="_blank" rel="noopener noreferrer">Whatsapp</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

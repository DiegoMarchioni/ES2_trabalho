// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Entrega from './pages/entrega';
import Sobre from './pages/sobre';
import Reservas from './pages/reservas';
import Cardapio from './pages/cardapio';
import Carrinho from './pages/carrinho';
import Pagamento from './pages/pagamento';


import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="/entrega" element={<Entrega />} />
            <Route path="/reservas" element={<Reservas />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/pagamento" element={<Pagamento />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

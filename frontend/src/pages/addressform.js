import React, { useState, useEffect } from 'react';

const AddressForm = () => {
  const [token, setToken] = useState('');
  const [address, setAddress] = useState({
    zip_code: '',
    country: '',
    street_address: '',
    city: '',
    state: '',
  });

  // Autentica e obtém o token
  useEffect(() => {
    fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: 'admin', password: 'mudar123' }),
    })
      .then((res) => res.json())
      .then((data) => setToken(data.token))
      .catch((err) => console.error('Erro ao autenticar:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/addresses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Erro no envio');
        return res.json();
      })
      .then((data) => {
        alert('Endereço cadastrado com sucesso!');
        console.log('Resposta:', data);
      })
      .catch((err) => {
        console.error('Erro ao enviar endereço:', err);
        alert('Erro ao cadastrar endereço');
      });
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto' }}>
      <h2>Cadastro de Endereço</h2>
      <form onSubmit={handleSubmit}>
        <label>
          CEP:
          <input type="text" name="zip_code" value={address.zip_code} onChange={handleChange} required />
        </label>
        <br />
        <label>
          País:
          <input type="text" name="country" value={address.country} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Endereço:
          <input type="text" name="street_address" value={address.street_address} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Cidade:
          <input type="text" name="city" value={address.city} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Estado:
          <input type="text" name="state" value={address.state} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit" disabled={!token}>Enviar</button>
      </form>
    </div>
  );
};

export default AddressForm;

import React, { useEffect, useState  } from 'react';
import { useNavigate, useLocation} from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState('');

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

  useEffect(() => {
    if(!token)return;
    const searchParams = new URLSearchParams(location.search);
    const orderId = searchParams.get('id');

    if (!orderId) {
      console.error('Parâmetro "id" ausente na URL');
      navigate('/');
      return;
    }
    
    const fetchOrder = async () => {
      try {
        console.log(orderId);
        const response = await fetch(`http://localhost:8080/orders/confirmPay/${orderId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
        });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log('Detalhes do pedido:', data);

        // Aqui você pode fazer algo com os dados, se necessário
      } catch (error) {
        console.error('Erro ao buscar o pedido:', error);
      } finally {
        navigate('/');
      }
    };

    fetchOrder();
  }, [location.search, navigate, token]);

  return (
    <div className="p-6 text-center">
      <h2 className="text-xl font-bold">Processando pedido...</h2>
    </div>
  );
};

export default Success;

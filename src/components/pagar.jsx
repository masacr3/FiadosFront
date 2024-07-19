import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './pagar.css';

const Pagar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [montos, setMontos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newMonto, setNewMonto] = useState('');

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = () => {
    axios.get('https://masacr3bot.pythonanywhere.com/usuarios')
      .then(response => {
        const foundUser = response.data.usuarios.find(user => user.id.toString() === id);
        if (foundUser) {
          setUser(foundUser);
          setMontos(foundUser.monto || []);
        }
      })
      .catch(error => {
        console.error('Hubo un error al obtener los usuarios!', error);
      });
  };

  const totalMonto = parseInt(montos.reduce((total, monto) => total + monto, 0));

  const handlePagar = () => {
    if (isAdding) {
      const fecha = new Date().toISOString();
      const pagoDelUsuario = parseInt(newMonto);
      const jsonData = {
        id: user.id,
        nombre: user.nombre,
        deuda_total: totalMonto,
        pago_del_usuario: pagoDelUsuario,
        fecha: fecha
      };
      
      axios.post('https://masacr3bot.pythonanywhere.com/pagar', jsonData)
        .then(response => {
          //fetchUser(); // Refresh the user data after payment
          setIsAdding(false);
          navigate(`/usuario/${user.id}`);
        })
        .catch(error => {
          console.error('Hubo un error al realizar el pago!', error);
        });
    } else {
      setIsAdding(true);
    }
  };

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="pagar-container">
      <h1>{user.nombre}</h1>
      <div className="usuario-acciones">
        <p className="usuario-total">Total: {totalMonto}</p>
        {isAdding && (
          <div className="usuario-agregar-monto">
            <input 
              type="number" 
              value={newMonto} 
              onChange={(e) => setNewMonto(e.target.value)} 
              placeholder="Cuanto pago" 
              className="usuario-monto-input"
            />
          </div>
        )}
        <button className="usuario-button" onClick={() => navigate(-1)}>Cancelar</button>
        <button className="usuario-pagar-boton" onClick={handlePagar}>
          {isAdding ? 'Enviar Pago' : 'Pagar'}
        </button>
      </div>
    </div>
  );
};

export default Pagar;

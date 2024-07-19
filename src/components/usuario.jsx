import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { useParams, useNavigate } from 'react-router-dom';
import './usuario.css';  // Importar el archivo CSS

const Usuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [montos, setMontos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [newMonto, setNewMonto] = useState('');
  const [editMonto, setEditMonto] = useState('');

  useEffect(() => {
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
      console.log("leo gato")
  }, [id]);

  if (!user) {
    return <div class="cargando">Cargando...</div>;
  }

  const totalMonto = montos.reduce((total, monto) => total + monto, 0);

  const handleAddMonto = () => {
    if (newMonto > 0) {
      const updatedUser = {
        ...user,
        monto: [ parseInt(newMonto)]
      };
      axios.post('https://masacr3bot.pythonanywhere.com/montos', updatedUser)
        .then(response => {
          setMontos([...montos, parseInt(newMonto)]);
          setNewMonto('');
          setIsAdding(false);
        })
        .catch(error => {
          console.error('There was an error adding the monto!', error);
        });
    } else {
      alert('El monto debe ser mayor a 0');
    }
  };

  const handleEditMonto = (index) => {
    const updatedMontos = [...montos];
    updatedMontos[index] = parseInt(editMonto);
    const updatedUser = {
      ...user,
      monto: updatedMontos
    };
    axios.put(`https://masacr3bot.pythonanywhere.com/montos/${user.id}/${user.nombre}`, updatedUser)
      .then(response => {
        setMontos(updatedUser.monto);
        setIsEditing(null);
      })
      .catch(error => {
        console.error('There was an error updating the monto!', error);
      });
  };

  const handleBack = () => {
    navigate('/');
  };

  const handlePagar = () => {
    navigate(`/pagar/${user.id}`);
  };

  return (
    <div className="usuario-container">
      <button className="usuario-button" onClick={handleBack}>Volver</button>
      <h1 className="usuario-nombre">{user.nombre}</h1>
      <h3 className="usuario-montos-titulo">Montos:</h3>
      <ul className="usuario-montos-lista">
        {montos.map((monto, index) => (
          <li key={index} className="usuario-monto-item">
            {isEditing === index ? (
              <div className="usuario-monto-editar">
                <input 
                  type="number" 
                  value={editMonto} 
                  onChange={(e) => setEditMonto(e.target.value)} 
                  placeholder="Nuevo Monto" 
                  className="usuario-monto-input"
                />
                <button className="usuario-monto-guardar" onClick={() => handleEditMonto(index)}>Guardar</button>
              </div>
            ) : (
              <div className="usuario-monto-mostrar">
                {monto}
                <FaEdit onClick={() => { setIsEditing(index); setEditMonto(monto); }} className="usuario-monto-editar-icono" />
                <FaEdit onClick={() => { setIsEditing(index); setEditMonto(monto); }} className="usuario-monto-editar-icono" />
              </div>
            )}
          </li>
        ))}
      </ul>
      {isAdding && (
        <div className="usuario-agregar-monto">
          <input 
            type="number" 
            value={newMonto} 
            onChange={(e) => setNewMonto(e.target.value)} 
            placeholder="Nuevo Monto" 
            className="usuario-monto-input"
          />
          <button className="usuario-agregar-boton" onClick={handleAddMonto}>Enviar</button>
        </div>
      )}
      <button className="usuario-agregar-monto-boton" onClick={() => setIsAdding(true)}>Agregar Monto</button>
      <div className="usuario-acciones">
        <button className="usuario-pagar-boton" onClick={handlePagar}>Pagar</button>
        <p className="usuario-total">Total: {totalMonto}</p>
      </div>
    </div>
  );
};

export default Usuario;



//pagina pago
//nombre usuario
//total {}
//button de aceptar


//pagina de pago 2
//total de pago
//Cancelar


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { TfiMoney } from "react-icons/tfi";
import { FaRegKeyboard } from "react-icons/fa";
import { useParams, useNavigate } from 'react-router-dom';
import './usuario.css';  // Importar el archivo CSS
import Footer from './Footer';
import AgregarMontos from './AgregarMontos';

const Usuario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [montos, setMontos] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newMonto, setNewMonto] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editMonto, setEditMonto] = useState('');
  const [editedMontos, setEditedMontos] = useState([]);
  const [agrego, setAgrego] = useState(false)
  const addMontoRef = useRef(null);
  const editMontoRef = useRef(null);
  const inputRef = useRef(null);  // Nuevo ref para el input de agregar monto

  useEffect(() => {
    axios.get('https://masacr3bot.pythonanywhere.com/usuarios')
      .then(response => {
        const foundUser = response.data.usuarios.find(user => user.id.toString() === id);
        if (foundUser) {
          setUser(foundUser);
          setMontos(foundUser.monto || []);
          setEditedMontos(foundUser.monto || []);
        }
      })
      .catch(error => {
        console.error('Hubo un error al obtener los usuarios!', error);
      });
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addMontoRef.current && !addMontoRef.current.contains(event.target)) {
        setIsAdding(false);
        setNewMonto('');
      }
      if (editMontoRef.current && !editMontoRef.current.contains(event.target)) {
        setEditIndex(null);
        setEditMonto('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // useEffect(() => {
  //   if (isAdding) {
  //     inputRef.current.focus();
  //   }
  // }, [isAdding]);

  if (!user) {
    return <div className="cargando">Cargando...</div>;
  }

  const totalMonto = editedMontos.reduce((total, monto) => total + monto, 0);

  const handleAddMonto = (e) => {
    e.preventDefault();
    if (newMonto > 0) {
      setEditedMontos([...editedMontos, parseInt(newMonto)]);
      setNewMonto('');
      setIsAdding(false);
    } else {
      alert('El monto debe ser mayor a 0');
    }
  };

  const handleEditMonto = (e, index) => {
    e.preventDefault();
    const updatedMontos = [...editedMontos];
    updatedMontos[index] = parseInt(editMonto);
    setEditedMontos(updatedMontos);
    setEditIndex(null);
  };

  const handleDeleteMonto = (index) => {
    const updatedMontos = editedMontos.filter((_, i) => i !== index);
    setEditedMontos(updatedMontos);
  };

  const handleDeleteMontoCarga = (index) => {
    const updatedMontos = newMonto.filter((_, i) => i !== index);
    setNewMonto(updatedMontos);
    if (updatedMontos.length == 0){
      setAgrego(false)
    }
  };

  const handleGuardar = () => {
    const updatedUser = {
      ...user,
      monto: editedMontos
    };
    console.log (updatedUser.monto)
    axios.put(`https://masacr3bot.pythonanywhere.com/montos/${user.id}/${user.nombre}`, updatedUser)
      .then(response => {
        setMontos([...editedMontos]);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('There was an error updating the montos!', error);
      });
  };

  const handleEnviar = () => {
    const updatedUser = {
      ...user,
      monto: newMonto
    };
    console.log (updatedUser.monto)
    axios.post('https://masacr3bot.pythonanywhere.com/montos', updatedUser)
      .then(response => {
        setMontos([...editedMontos]);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('There was an error updating the montos!', error);
      });
  };


  const handleCancel = () => {
    setEditedMontos(montos);
    setIsEditing(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  const handlePagar = () => {
    navigate(`/pagar/${user.id}`);
  };

  return (
    <div className="usuario-container">
      <h1 className={`usuario-nombre ${isEditing ? 'editar' : ''}`}>
        {user.nombre}
        {isEditing && <MdDeleteForever className="usuario-eliminar-icono" />}
      </h1>
      <div className="monto-container">
        <div className='usuario-mon-btn'>
          {!isAdding && !agrego && <ul className="usuario-montos-lista">
            {editedMontos.map((monto, index) => (
              <li key={index} className="usuario-monto-item">
                {editIndex === index ? (
                  <div ref={editMontoRef} className="usuario-monto-editar">
                    <form onSubmit={(e) => handleEditMonto(e, index)}>
                      <input
                        type="number"
                        value={editMonto}
                        onChange={(e) => setEditMonto(e.target.value)}
                        placeholder="Nuevo Monto"
                        className="usuario-monto-input"
                      />
                    </form>
                  </div>
                ) : (
                  <div className="usuario-monto-mostrar">
                    <span className="monto-texto">{monto}</span>
                    {isEditing && (
                      <div className="iconos-container">
                        <FaEdit onClick={() => { setEditIndex(index); setEditMonto(monto); }} className="usuario-monto-editar-icono" />
                        <MdDeleteForever onClick={() => handleDeleteMonto(index)} className="usuario-monto-eliminar-icono" />
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
          }
          {agrego && <ul className='usuario-montos-lista'>
              {newMonto && newMonto.map((monto, index) =>(
                <li key={index} className='usuario-monto-item'>
                  <div className="usuario-monto-mostrar">
                    <span className="monto-texto">{monto}</span>
                      <div className="iconos-container">
                        <MdDeleteForever onClick={() => handleDeleteMontoCarga(index)} className="usuario-monto-eliminar-icono" />
                      </div>
                  </div>
                </li>
              ) )}
            </ul>}
          <div className="usuario-acciones">
            <FaRegKeyboard
              className={`usuario-agregar-monto-icono ${isEditing ? 'disabled' : ''}`}
              onClick={() => { !isEditing && setIsAdding(true); setAgrego(true)}}
              style={{ cursor: !isEditing ? 'pointer' : 'not-allowed', color: !isEditing ? 'black' : 'white' }}
            />
            <TfiMoney
              className={`usuario-pagar-icono ${isEditing ? 'disabled' : ''}`}
              onClick={() => !isEditing && handlePagar()}
              style={{ cursor: !isEditing ? 'pointer' : 'not-allowed', color: !isEditing ? 'black' : 'white' }}
            />
            <p className="usuario-total">Total: {totalMonto}</p>
          </div>
        </div>
        {isAdding && //(
        //   <div ref={addMontoRef} className="usuario-agregar-monto">
        //     <form onSubmit={handleAddMonto} className="usuario-agregar-monto-form">
        //       <input
        //         ref={inputRef}
        //         type="number"
        //         value={newMonto}
        //         onChange={(e) => setNewMonto(e.target.value)}
        //         placeholder="Nuevo Monto"
        //         className="usuario-monto-input"
        //       />
        //       <button type="button" className="usuario-cancelar-monto-bton"onClick={() => { setIsAdding(false); setNewMonto(''); }}>
        //         Cancelar
        //       </button>
        //     </form>
        //   </div>
        // )
          <AgregarMontos newMonto={newMonto} setNewMonto={setNewMonto} setIsAdding={setIsAdding} setAgrego={setAgrego}/>
        }
      </div>
      {!isAdding && <Footer 
                        isEditing={isEditing} 
                        setIsEditing={setIsEditing} 
                        handleGuardar={handleGuardar}
                        handlerEnviar={handleEnviar} 
                        handleCancel={handleCancel}/>
      }
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


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './pagar.css'; 
import BotonAnterior from './botonFlotante/BotonAnterior';

const Pagar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [montos, setMontos] = useState([]);
  const [newMonto, setNewMonto] = useState('');
  const inputRef = useRef(null);
  const [vuelto, setVuelto] = useState(0)

  const[tramite , setTramite] = useState(false);
  const[calculoVuelto, setCalculoVuelto] = useState(false);

  useEffect(() => {
    fetchUser();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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
      const fecha = new Date().toISOString();
      const pagoDelUsuario = parseInt(newMonto);
      const jsonData = {
        id: user.id,
        nombre: user.nombre,
        deuda_total: totalMonto,
        pago_del_usuario: pagoDelUsuario,
        monto : user.monto,
        fecha: fecha
      }
      
      axios.post('https://masacr3bot.pythonanywhere.com/pagar', jsonData)
        .then(response => {
           navigate(`/usuario/${user.id}`);
        })
        .catch(error => {
          console.error('Hubo un error al realizar el pago!', error);
        });
    
  };

  if (!user) return <div>Cargando...</div>;

  const apretoEnter = (e) => {
    if ( e.key === 'Enter') {
      // Previene el comportamiento por defecto del Enter (por ejemplo, si está dentro de un formulario)
      e.preventDefault();
      // Quita el foco del input
      inputRef.current.blur();

      if (!isNaN(parseInt(newMonto))){
        // Agrega el valor del input a la lista
        let monto = parseInt(newMonto);

        setVuelto(monto - totalMonto);

        setCalculoVuelto(true)
        
      }
      else{
        console.log("el valor no es numerico")
      }
    }
  };

  return (
    <div className='fullbg'>
      <BotonAnterior user={user}/>
      <div className='flex montserrat-f-100 fs-70 pagar'>Pagar</div>
      <div className='flex-col-center'>
        <div className='text-monto-70 fs-70 flex-center'><p>{totalMonto}</p></div>
        {!tramite && <button onClick={()=>setTramite(true)} className="tramite">Pagar!!</button>}
        {
          tramite && !calculoVuelto  && <input 
                            type="number" 
                            ref={inputRef}
                            value={newMonto}
                            onChange={(e) => setNewMonto(e.target.value)}
                            onKeyDown={apretoEnter}
                            placeholder="Con cuanto pago..."
                            className="pagar-input"
                      />
        }
        {
          calculoVuelto && <h2>pago con ${newMonto}</h2>
        }
        {
          calculoVuelto && ( vuelto >= 0 ? <h2 className='text-center'>El vuelto es {vuelto}, el usuario queda sin deuda</h2>
            :
            <h2 className='text-center'>El usuario queda con una deuda de {vuelto * (-1)}</h2>
          )
        }
        {
          calculoVuelto && <div className='flex-row'>
            <button className='tramite small' onClick={handlePagar}>Saldar cuenta!!</button>
            {/* <button className='tramite small' onClick={()=> navigate(-1)}>Cancelar</button> */}
          </div>
        }
      </div>
    
    </div>
  );
};

export default Pagar;

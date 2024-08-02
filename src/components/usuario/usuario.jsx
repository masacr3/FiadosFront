import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './usuario.css';  // Importar el archivo CSS
import Footer from './Footer';
import AgregarMontos from './AgregarMontos';
import Acciones from './Acciones';
import GridCargaDatos from './GridCargaDatos';
import Header from './Header';
import GridHistorialDeuda from './GridHistorialDeuda';

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

  const totalMonto = editedMontos.reduce((total, monto) => total + monto, 0);

  const handleEliminarUsuario = () =>{
    axios.delete(`https://masacr3bot.pythonanywhere.com/usuarios/${id}`)
      .then(response => {
        console.log(response.data.mensaje)
        navigate("/");
      })
      .catch(error => {
        console.error('Hubo un error al eliminar el usuario!', error);
      });
  }


  const handleEditMonto = (e, index) => {

    if ( e.key === 'Enter') {
      // Previene el comportamiento por defecto del Enter (por ejemplo, si está dentro de un formulario)
      e.preventDefault();

      const updatedMontos = [...editedMontos];
      updatedMontos[index] = parseInt(editMonto);
      setEditedMontos(updatedMontos);
      setEditIndex(null);
    }

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
      .then(() => {
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
      monto: newMonto.reverse()
    };
    console.log("apreto enviar")
    console.log (updatedUser)
    axios.post('https://masacr3bot.pythonanywhere.com/montos', updatedUser)
      .then(response => {
        console.log(response.data.mensaje)
        setMontos([...editedMontos, ...updatedUser.monto]);
        setEditedMontos([...editedMontos, ...updatedUser.monto ])
        setIsEditing(false);
        setNewMonto([]);

        //salgo
        setIsAdding(false);
        setAgrego(false);
        
      })
      .catch(error => {
        console.error('There was an error updating the montos!', error);
      });
  };

  const handleCancel = () => {
    setEditedMontos(montos);
    setIsEditing(false);
  };

  const handleCancelEnvio = () =>{
    setIsAdding(false);
    setAgrego(false);
    setNewMonto([]);
  }

  const handlePagar = () => {
    navigate(`/pagar/${user.id}`);
  };

  return (
    <div className="card">
      {user && <Header isEditing={isEditing} nombre={user.nombre} eliminar={handleEliminarUsuario}/>}
      <div className="monto-container">
        <div className='usuario-mon-btn'>
          { !isAdding && !agrego &&
                                    <GridHistorialDeuda editedMontos={editedMontos} editIndex={editIndex} editMonto={editMonto} setEditMonto={setEditMonto} handleEditMonto={handleEditMonto} setEditIndex={setEditIndex} handleDeleteMonto={handleDeleteMonto} isEditing={isEditing} />
          }
          { agrego ?
                    <GridCargaDatos newMonto={newMonto} handleDeleteMontoCarga={handleDeleteMontoCarga} setIsAdding={setIsAdding}/>
                    :
                    ( !isEditing  && <Acciones isEditing={isEditing} setIsAdding={setIsAdding} setAgrego={setAgrego} handlePagar={handlePagar} totalMonto={totalMonto}/> )
          }
        </div>
        {isAdding 
                && // esto seria un modal
                  <AgregarMontos newMonto={newMonto} setNewMonto={setNewMonto} setIsAdding={setIsAdding} setAgrego={setAgrego}/>}
      </div>
      {!isAdding 
                && <Footer lista={newMonto} isEnviar={agrego} isEditing={isEditing} setIsEditing={setIsEditing} handleGuardar={handleGuardar} handleEnviar={handleEnviar} handleCancel={handleCancel} handleCancelEnvio={handleCancelEnvio}/>}
    </div>
  );
};

export default Usuario;
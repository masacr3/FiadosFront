import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BotonFlotante from './botonFlotante/BotonFlotante';
import Titulo from './Titulo';
import Tamanioviewport from './tools/Tamanioviewport';

const Filtrador = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activateSearch, setActivateSearch] = useState(false)
  const navigate = useNavigate();

  const inputRef = useRef(null);

    useEffect(() => {
      if (activateSearch && inputRef.current) {
        inputRef.current.focus();
      }
    }, [activateSearch]);

  useEffect(() => {
    axios.get('https://masacr3bot.pythonanywhere.com/usuarios')
    .then(response => {
      setUsers(response.data.usuarios);
      console.log("cargando usuarios de la base de datos")
    })
    .catch(error => {
      console.error('Hubo un error al obtener los usuarios!', error);
    });
  }, []);

  const handleUserClick = (user) => {
    navigate(`/usuario/${user.id}`);
  };

  const handleCrearUsuario = () => {
    if (!searchTerm.trim()) {
      console.error('El nombre de usuario no puede estar vacío');
      return;
    }
  
    const nuevoId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
  
    const nuevoUsuario = {
      id: nuevoId,
      nombre: searchTerm
    };
  
    axios.post('https://masacr3bot.pythonanywhere.com/usuarios', nuevoUsuario)
      .then(response => {
        console.log('Usuario agregado:', response.data.usuario);
        setUsers(prevUsers => [...prevUsers, response.data.usuario]); // Actualizar la lista de usuarios
        navigate(`/usuario/${response.data.usuario.id}`); // Navegar al nuevo usuario creado
        setSearchTerm(''); // Limpiar el campo de búsqueda después de crear el usuario
      })
      .catch(error => {
        console.error('Error al agregar usuario:', error);
      });
  };

  const filteredUsers = users.filter(user =>
    user.nombre && user.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card">
      <Tamanioviewport />
      <Titulo />
      <BotonFlotante nombre={"Filtrar"} setActivateSearch={setActivateSearch} activateSearch={activateSearch}/>
      {activateSearch && 
                          <div className="header">
                            <input
                              type="text"
                              ref={inputRef}
                              value={searchTerm}
                              onChange={e => setSearchTerm(e.target.value)}
                              onBlur={()=>setActivateSearch(false)}
                              className="filtrador-input"
                            />
                            <span className='bar'></span>
                            <label>Filtrar usuarios</label>
                          </div>
      }
      {filteredUsers.length !==0 && <div className='pr'>
                        <label className='title-s'>Lista de deudores</label>
                        <ul>
                          {filteredUsers.map(user => (
                            <li key={user.id} onClick={() => handleUserClick(user)} className='flex-center'>
                              <div>{user.nombre}</div>
                            </li>
                          ))}
                        </ul>
                        </div>
      }
      {
        searchTerm.length > 0 && filteredUsers.length === 0 && <button >Crear el usuario {searchTerm}</button>
      }
    </div>
  );
};

export default Filtrador;

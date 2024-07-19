import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './filtrador.css'; // Importar el archivo CSS

const Filtrador = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    console.log("a ver si me salvo")
  }, []);

  const fetchUsers = () => {
    axios.get('https://masacr3bot.pythonanywhere.com/usuarios')
      .then(response => {
        setUsers(response.data.usuarios);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los usuarios!', error);
      });
  };

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
    <div className="filtrador-container">
      <div className="filtrador-buscador">
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Buscar usuario"
          className="filtrador-input"
        />
        {filteredUsers.length === 0 && (
          <button onClick={handleCrearUsuario} className="filtrador-btn-crear">
            Crear Usuario
          </button>
        )}
      </div>

      <h3 className="filtrador-titulo">Lista de Usuarios</h3>
      <ul className="filtrador-lista">
        {filteredUsers.map(user => (
          <li key={user.id} onClick={() => handleUserClick(user)} className="filtrador-item">
            {user.nombre}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filtrador;

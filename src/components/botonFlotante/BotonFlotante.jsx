/* eslint-disable react/prop-types */
import { useState } from "react";

function BotonFlotante({nombre, searchTerm, setSearchTerm, filteredUsers, handleCrearUsuario}) {
  const [expanded, setExpanded] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (expanded){
      setSearchTerm('');
    }
    else{
        scrollToTop();
    }
  };
  return (
    <div className={`bton-flotante ${expanded ? 'expanded fixedTop' : ''}`}>
        {!expanded && <button className="fab" onClick={handleExpandClick}>{nombre}</button>}
        { expanded && 
            <div className="header">
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="filtrador-input"
              />
              <span className='bar'></span>
              <label>Filtrar usuarios</label>
              <div className="flex-row">
                {filteredUsers.length === 0 && <button className="crear-usuario" onClick={handleCrearUsuario}>Crear Usuario</button>}
                <button className={"cancel-button"} onClick={handleExpandClick}>cancel</button>
              </div>
            </div>
        }
    </div>
    
  )
}

export default BotonFlotante
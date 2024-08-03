import React, { useState } from 'react'

function IngresoMonto({newMonto, setNewMonto, agrego, setAgrego}) {
    const [expanded, setExpanded] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
    const handleKeyDown = (e) => {
        if ( e.key === 'Enter') {
          // Previene el comportamiento por defecto del Enter (por ejemplo, si está dentro de un formulario)
          e.preventDefault();

          if (!isNaN(parseInt(inputValue))){
            // Agrega el valor del input a la lista
            setNewMonto([parseInt(inputValue), ...newMonto]);
            // Limpia el input
            setInputValue('');
          }
          else{
            console.log("el valor no es numerico")
          }
        }
      };

    const handleExpandClick = () => {
        setExpanded(!expanded);
        if (expanded){
          console.log("nada");
        }
        else{
            scrollToTop();
            setAgrego(true)
        }
      };
  return (
    <div className={`bton-flotante ${expanded ? 'expanded fixedfulltop' : ''}`}>
        {!expanded && <button className="monto" onClick={handleExpandClick}>{agrego ? "Seguir Ingresando" : "ingresar"}</button>}
        {expanded && 
        <>
            <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nuevo Monto"
                className="usuario-monto-input"
              />
              <button className='cancel-button' onClick={handleExpandClick}>Listo</button>
              </>
              }
    </div>
  )
}

export default IngresoMonto
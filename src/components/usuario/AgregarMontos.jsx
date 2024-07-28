import React, { useState } from 'react'

function AgregarMontos({newMonto, setNewMonto, setIsAdding, setAgrego}) {
    const [inputValue, setInputValue] = useState('')
    const handleKeyDown = (e) => {
        if ( e.key === 'Enter') {
          // Previene el comportamiento por defecto del Enter (por ejemplo, si está dentro de un formulario)
          e.preventDefault();
          // Agrega el valor del input a la lista
          setNewMonto([parseInt(inputValue), ...newMonto]);
          // Limpia el input
          setInputValue('');
        }
      };
  return (
    <div className="usuario-agregar-monto-p">
        <div className="usuario-agregar-monto-form">
            <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Nuevo Monto"
                className="usuario-monto-input"
              />
            <button type="button" className="usuario-cancelar-monto-bton"onClick={() => { setIsAdding(false); setNewMonto([]); setAgrego(false); }}>
                Cancelar
            </button>
            <button className='usuario-cancelar-monto-bton' onClick={()=> {setAgrego(true); setIsAdding(false)}}>Ok</button>
        </div>
    </div>
  )
}

export default AgregarMontos
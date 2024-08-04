import React from 'react'

function BotonGuardar({guardar}) {
  return (
    <div className="bton-flotante apilar1">
        <button className='cancelar' onClick={guardar}>Guardar</button>
    </div>
  )
}

export default BotonGuardar
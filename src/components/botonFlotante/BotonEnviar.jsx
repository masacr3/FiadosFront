import React from 'react'

function BotonEnviar({handleEnviar}) {
  return (
    <div className="bton-flotante apilar1">
        <button className='enviar' onClick={handleEnviar}>Enviar</button>
    </div>
  )
}

export default BotonEnviar
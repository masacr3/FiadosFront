import React from 'react'

function BotonCancelar({handleCancelEnvio}) {
  return (
    <div className="bton-flotante apilar2">
        <button className='cancelar' onClick={handleCancelEnvio}>Cancelar</button>
    </div>
  )
}

export default BotonCancelar
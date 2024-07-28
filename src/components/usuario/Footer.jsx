import React from 'react'
import { useNavigate } from 'react-router-dom'

function Footer({isEditing, isEnviar, setIsEditing, handleCancel, handleGuardar, handleEnviar}) {
    const navigateTo = useNavigate() 

    const handleBack = () => navigateTo("/")
  return (
    <div className="btn-flotantes-conteiner">
        <button className="usuario-button" onClick={isEditing ? handleCancel : handleBack}>
          {isEditing ? 'Cancelar' : 'Volver'}
        </button>
        <button className="usuario-button" onClick={isEditing ? handleGuardar : () => setIsEditing(true)}>
          {isEditing ? 'Guardar' : 'Editar'}
        </button>
      </div>
  )
}

export default Footer
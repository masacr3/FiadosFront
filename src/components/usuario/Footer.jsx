/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'

function Footer({isEditing, lista,  isEnviar, setIsEditing, handleCancel, handleGuardar, handleEnviar, handleCancelEnvio}) {
    const navigateTo = useNavigate() 

    const handleBack = () => navigateTo("/")

   
  return (
    <div className="btn-flotantes-conteiner">
      { isEnviar ?
          <>
          <button className="usuario-button" onClick={handleCancelEnvio}>
            Cancelar
          </button>
          <button className={`usuario-button ${lista.length === 0 ? 'disabled' : ''}`} onClick={handleEnviar}>
            Enviar
          </button>
          </>  
        :
        <>
          <button className="usuario-button" onClick={isEditing ? handleCancel : handleBack}>
            {isEditing ? 'Cancelar' : 'Volver'}
          </button>
          <button className="usuario-button" onClick={isEditing ? handleGuardar : () => setIsEditing(true)}>
            {isEditing ? 'Guardar' : 'Editar'}
          </button>
        </>
      }
      </div>
  )
}

export default Footer
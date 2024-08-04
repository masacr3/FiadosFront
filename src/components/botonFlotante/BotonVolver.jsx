import { useNavigate } from "react-router-dom"

function BotonVolver() {
  const navigateTo = useNavigate() 
  return (
    <div className="bton-flotante apilar1">
        <button className='cancelar' onClick={()=> navigateTo("/")}>Volver</button>
    </div>
  )
}

export default BotonVolver
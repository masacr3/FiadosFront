import { useNavigate } from "react-router-dom"

function BotonAnterior({user}) {
    const navigate = useNavigate() 
    return (
      <div className="bton-flotante apilar3">
          <button className='cancelar' onClick={()=> navigate(`/usuario/${user.id}`)}>Volver</button>
      </div>
    )
}

export default BotonAnterior
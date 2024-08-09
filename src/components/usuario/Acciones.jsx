import { useEffect } from "react";
import { FaRegKeyboard } from "react-icons/fa";
import { TfiMoney } from "react-icons/tfi";

// eslint-disable-next-line react/prop-types
function Acciones({isEditing, setIsAdding, setAgrego, handlePagar, totalMonto}) {
  return (
    <div className="usuario-acciones">
            {/* <FaRegKeyboard
              className={`usuario-agregar-monto-icono ${isEditing ? 'disabled' : ''}`}
              onClick={() => { !isEditing && setIsAdding(true); setAgrego(true)}}
              style={{ cursor: !isEditing ? 'pointer' : 'not-allowed', color: !isEditing ? 'black' : 'white' }}
            /> */}
            <TfiMoney
              className={`usuario-pagar-icono ${isEditing ? 'disabled' : ''}`}
              onClick={() => !isEditing && handlePagar()}
              style={{ cursor: !isEditing ? 'pointer' : 'not-allowed', color: !isEditing ? 'black' : 'white' }}
            />
            {/* <p className="usuario-total">Total: {totalMonto}</p> */}
    </div>
  )
}

export default Acciones
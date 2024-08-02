/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";

function Header({isEditing, nombre, eliminar}) {
  return (
    <div className={`titulo flex-row-jc-e ${isEditing ? 'editar' : 'no-editar'}`}>
        <span>{nombre}</span>
        {isEditing && <MdDeleteForever className="icono-eliminar" onClick={eliminar} />}
    </div>
  )
}

export default Header
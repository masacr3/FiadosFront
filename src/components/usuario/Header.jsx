/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";

function Header({isEditing, nombre}) {
  return (
    <h1 className={`usuario-nombre ${isEditing ? 'editar' : ''}`}>
        {nombre}
        {isEditing && <MdDeleteForever className="usuario-eliminar-icono" />}
    </h1>
  )
}

export default Header
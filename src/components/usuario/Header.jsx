/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";
import { LiaUserEditSolid } from "react-icons/lia";

function Header({isEditing, nombre, total,  eliminar, editar}) {
  return (
    <div className={`titulo flex-row-jc-e ${isEditing ? 'editar' : 'no-editar'}`}>
          <span>{nombre}</span>
          <div className="texto-discreto">${total}</div>
          {isEditing ? <MdDeleteForever className="icono-eliminar" onClick={eliminar} /> : <LiaUserEditSolid onClick={()=> editar(true)}/>}
    </div>
  )
}

export default Header
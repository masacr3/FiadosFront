/* eslint-disable react/prop-types */
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";


// eslint-disable-next-line react/prop-types
function GridHistorialDeuda({editedMontos, editIndex, editMonto, setEditMonto, handleEditMonto, setEditIndex, handleDeleteMonto, isEditing}) {
  return (
    <ul className="usuario-montos-lista">
            {[].map.call(editedMontos, x => x).reverse().map((monto, index) => (
              <li key={index} className="usuario-monto-item">
                {editIndex === index ? (
                  <div className="usuario-monto-editar">
                      <input
                        type="number"
                        value={editMonto}
                        onChange={(e) => setEditMonto(e.target.value)}
                        onKeyDown={(e) => handleEditMonto(e, index)}
                        placeholder="Nuevo Monto"
                        className="usuario-monto-input"
                      />
                  </div>
                ) : (
                  <div className="usuario-monto-mostrar">
                    <span className="monto-texto">{monto}</span>
                    {isEditing && (
                      <div className="iconos-container">
                        <FaEdit onClick={() => { setEditIndex(index); setEditMonto(monto); }} className="usuario-monto-editar-icono" />
                        <MdDeleteForever onClick={() => handleDeleteMonto(index)} className="usuario-monto-eliminar-icono" />
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
  )
}

export default GridHistorialDeuda
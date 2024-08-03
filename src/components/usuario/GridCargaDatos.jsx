/* eslint-disable react/prop-types */
import { MdDeleteForever } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function GridCargaDatos({newMonto, handleDeleteMontoCarga, setIsAdding}) {
  return (
    <div className='flex-col'>
        <h3>Carga datos</h3>
        <ul className='usuario-montos-lista'>
                {newMonto && newMonto.map((monto, index) =>(
                    <li key={index} className='usuario-monto-item'>
                    <div className="usuario-monto-mostrar">
                        <span className="monto-texto">{monto}</span>
                        <div className="iconos-container">
                            <MdDeleteForever onClick={() => handleDeleteMontoCarga(index)} className="usuario-monto-eliminar-icono" />
                        </div>
                    </div>
                    </li>
                ) )}
        </ul>
        {/* <button className="usuario-button" onClick={()=> setIsAdding(true)}>Seguir Cargando..</button> */}
    </div>
  )
}

export default GridCargaDatos
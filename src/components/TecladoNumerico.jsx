import React, { useEffect, useState } from 'react'
import { BsArrowReturnLeft } from "react-icons/bs";
import { RiDeleteBack2Line } from "react-icons/ri";

function TecladoNumerico({keyDownEnter, focus, setExpanded}) {
  const [entrada, setEntrada] = useState([])
  const [numeros, setNumeros] = useState(["1","2","3","4","5","6","7","8","9","X","0","E"])

  useEffect(()=> focus(true),[]);

  const pushTecla = (tecla) => {
    if (tecla !== "X" || tecla !== "E"){
        setEntrada([...entrada, tecla])
    }

    if (tecla == "X"){
        entrada.pop()
        setEntrada([...entrada])
    }

    if (tecla == "E"){
      keyDownEnter(entrada);
      setEntrada([]);
    }
  }

  const ponerPunto = (value) => {
    let valueR = [...value].reverse()
    let valuecnPuntos = []
    for (let i=0; i<valueR.length ; i++){
      if(i && i % 3 === 0){
        valuecnPuntos.push(".");
      }
      valuecnPuntos.push(valueR[i]);
    }
    return valuecnPuntos.reverse();
  }

  const retornaBton = (item , index) =>{
    if (item === "E"){
      return <BsArrowReturnLeft key={index} className='bton-input-teclado' onClick={() => pushTecla(item)} />
    }

    if (item === "X"){
      return <RiDeleteBack2Line key={index} className='bton-input-teclado' onClick={() => pushTecla(item)} />
    }

    return <div key={index} className='bton-input-teclado' onClick={() => pushTecla(item)}> <span>{item}</span></div>  
  }
  return (
    <div className='footer-center'>
        <div className='flex-col-center'>
            {entrada.length > 0 ? <h1 className='input-text-teclado'>${ponerPunto(entrada)}</h1> : <h1/>}
            <div className='teclado'>
                { numeros.map((item,index)=> retornaBton(item, index) ) }
            </div>
            <div className='listo-btn-teclado' onClick={()=>{focus(false); setExpanded(false)}}>Ocultar teclado</div>
        </div>
    </div>
  )
}

export default TecladoNumerico
import React from 'react';
import axios from 'axios';
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
//import Filtrador from './components/filtrador';
//import Usuario from './components/usuario';
//import Pagar from './components/pagar';  // Importar el componente Pagar

function App() {
  const [data , setData]  = useState([])

  useEffect ( ( )=>{ 
    axios.get("https://masacr3bot.pythonanywhere.com/usuarios").then(response => {

      console.log(response.data.usuarios);
      setData([...response.data.usuarios])
    })
  },[]
  ) 

  return (
    <>
    <h1>Hola</h1>
    <ul>
        {data && 
          data.map((item,i) =>
            <li key={i} className='lora'>
              {item.nombre}
            </li>
          )
        }
    </ul>
    </>
  );
}

export default App;

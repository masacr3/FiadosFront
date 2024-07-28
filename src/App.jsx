import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Filtrador from './components/filtrador.jsx';
import Usuario from './components/usuario/usuario.jsx';
import Pagar from './components/pagar.jsx';  // Importar el componente Pagar

function App() {
  return (
    <Router basename="/FiadosFront">
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Filtrador />} />
            <Route path="/usuario/:id" element={<Usuario />} />
            <Route path="/pagar/:id" element={<Pagar />} /> {/* Agregar ruta para el componente Pagar */}
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;


/*
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

export default App; */

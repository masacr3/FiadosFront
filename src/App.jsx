import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import './index.css'
import './App.css';
import Filtrador from './components/filtrador.jsx';
import Usuario from './components/usuario/Usuario.jsx';
import Pagar from './components/pagar.jsx';  // Importar el componente Pagar
import InputIphone from './components/InputIphone.jsx';
import TecladoNumerico from './components/TecladoNumerico.jsx';

function App() {
    useEffect(() => {
      document.body.classList.add('dark');
      return () => {
        document.body.classList.remove('dark');
      };
    }, []);

  return (
    <Router>
      <Routes className="container">
        <Route path="/" element={<Filtrador />} />
        {/* <Route path="/" element={<TecladoNumerico />} />  */}
        <Route path="/usuario/:id" element={<Usuario />} />
        <Route path="/pagar/:id" element={<Pagar />} /> {/* Agregar ruta para el componente Pagar */}
        </Routes>
    </Router>
  );
}

export default App;

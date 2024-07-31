import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Filtrador from './components/filtrador.jsx';
import Usuario from './components/usuario/Usuario.jsx';
import Pagar from './components/pagar.jsx';  // Importar el componente Pagar

function App() {
  return (
    <Router>
      <Routes className="container">
        <Route path="/" element={<Filtrador />} />
        <Route path="/usuario/:id" element={<Usuario />} />
        <Route path="/pagar/:id" element={<Pagar />} /> {/* Agregar ruta para el componente Pagar */}
        </Routes>
    </Router>
  );
}

export default App;

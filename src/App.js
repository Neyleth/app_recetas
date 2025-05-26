import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListaRecetas from "./ListaRecetas";
import DetalleReceta from "./DetalleReceta";
//import FormularioReceta from "./FormularioReceta";
import AgregarReceta from "./AgregarReceta"; 

function App() {
  const [recetas, setRecetas] = useState([]);

  const fetchRecetas = async () => {
    const res = await fetch("http://127.0.0.1:5000/recetas");
    const data = await res.json();
    setRecetas(data);
  };

  useEffect(() => {
    fetchRecetas();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaRecetas recetas={recetas} />} />
        <Route path="/receta/:id" element={<DetalleReceta />} />
        <Route path="/agregar" element={<AgregarReceta />} />
      </Routes>
    </Router>
  );
}

export default App;
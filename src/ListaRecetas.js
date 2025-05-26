import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListaRecetas() {
  const [recetas, setRecetas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/recetas")
      .then((res) => res.json())
      .then((data) => setRecetas(data))
      .catch((error) => console.error("Error al obtener recetas:", error));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Recetas disponibles</h1>
      {recetas.length === 0 ? (
        <p>Cargando recetas...</p>
      ) : (
        <ul>
          {recetas.map((receta) => (
            <li key={receta.id}>
              <Link to={`/receta/${receta.id}`}>{receta.nombre}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaRecetas;
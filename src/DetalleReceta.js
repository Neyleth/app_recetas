import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function DetalleReceta() {
  const { id } = useParams();
  const [receta, setReceta] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/recetas/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Receta no encontrada");
        return res.json();
      })
      .then((data) => {
        setReceta(data);
        setError(null);
      })
      .catch((error) => {
        setError(error.message);
        setReceta(null);
      });
  }, [id]);

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  if (!receta) {
    return <p style={{ textAlign: "center" }}>Cargando receta...</p>;
  }

  return (
  <div className="detalle-receta" style={{ padding: "1rem" }}>
    <h1>{receta.nombre}</h1>

    <h3>Ingredientes:</h3>
    <ul>
      {receta.ingredientes.map((ing, index) => (
        <li key={index}>{ing}</li>
      ))}
    </ul>

    <h3>Preparación:</h3>
    <p>{receta.descripcion}</p>

    <Link to="/" className="btn-volver" style={{ display: "inline-block", marginTop: "1rem" }}>
      ← Volver al inicio
    </Link>
  </div>
);
}

export default DetalleReceta;
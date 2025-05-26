import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function AgregarReceta() {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !ingredientes || !descripcion) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const nuevaReceta = {
      nombre,
      ingredientes: ingredientes.split(",").map((i) => i.trim()),
      descripcion,
    };

    try {
      const res = await fetch("http://127.0.0.1:5000/recetas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaReceta),
      });

      if (!res.ok) throw new Error("Error al agregar receta");

      // Redirige a la lista principal
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h1>Agregar nueva receta</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
          <label>Ingredientes (separados por coma):</label>
          <input value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <button type="submit">Agregar</button>
      </form>

      <Link to="/">← Volver al inicio</Link>
    </div>
  );
}

export default AgregarReceta;
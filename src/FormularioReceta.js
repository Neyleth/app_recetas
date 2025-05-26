import React, { useState } from "react";

function FormularioReceta({ onRecetaAgregada }) {
  const [nombre, setNombre] = useState("");
  const [ingredientes, setIngredientes] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas

    if (descripcion.trim() === "") {
      setError("La descripción no puede estar vacía.");
      return;
    }
    if (nombre.trim() === "") {
      setError("El nombre de la receta no puede estar vacío.");
      return;
    }

    const listaIngredientes = ingredientes
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    if (listaIngredientes.length === 0) {
      setError("Debe ingresar al menos un ingrediente válido.");
      return;
    }

    // Si todo está bien, limpiamos el error
    setError("");

    const nuevaReceta = {
      nombre: nombre.trim(),
      ingredientes: listaIngredientes,
      descripcion: descripcion.trim(), 
    };

    const res = await fetch("http://127.0.0.1:5000/recetas", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevaReceta),
    });

    if (res.ok) {
      setNombre("");
      setIngredientes("");
      onRecetaAgregada();
      setDescripcion("");
    } else {
      setError("Error al agregar receta. Intenta de nuevo.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
  <h2>Agregar nueva receta</h2>
  {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

  <div>
    <label>Nombre:</label>
    <input
      type="text"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      required
    />
  </div>

  <div>
    <label>Ingredientes (separados por coma):</label>
    <input
      type="text"
      value={ingredientes}
      onChange={(e) => setIngredientes(e.target.value)}
      required
    />
  </div>

  <div>
    <label>Descripción / Preparación:</label>
    <textarea
      value={descripcion}
      onChange={(e) => setDescripcion(e.target.value)}
      required
      rows={4}
      style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ccc" }}
    />
  </div>

  <button type="submit">Agregar receta</button>
</form>
  );
}

export default FormularioReceta;
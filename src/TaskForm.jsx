import { useState } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import { Link } from "react-router-dom";

function TaskForm({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("No hay sesión activa. Inicia sesión.");
      return;
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("✅ Tarea creada exitosamente");
      setTitle("");
      setDescription("");

      document.getElementById("tareas").click();

      if (onTaskCreated) {
        onTaskCreated(); // Llama a la función si está definida
      }
    } else {
      setMessage(`❌ Error: ${data.error || "No se pudo crear la tarea"}`);
    }
  };

  return (
    <div className="w600">
      <h2>➕ Crear Tarea</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br />

        <button type="submit">Crear Tarea</button>
        <Link id="tareas" className="hidden" type="button" to={`/tasks`}>
          Tareas
        </Link>
        <Link className="" to={`/tasks`}>
          Cancel
        </Link>
      </form>
    </div>
  );
}

// ✅ Validar la prop con PropTypes
TaskForm.propTypes = {
  onTaskCreated: PropTypes.func.isRequired,
};

export default TaskForm;

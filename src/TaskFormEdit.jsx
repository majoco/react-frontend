import { useState } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import { Link } from "react-router-dom";

function TaskFormEdit({ onTaskUpdated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  //const [id, setId]  = useState(-1);

  console.log(onTaskUpdated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("No hay sesión activa. Inicia sesión.");
      return;
    }

    const response = await fetch("http://localhost:3000/tasks/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("✅ Tarea editada exitosamente");
      setTitle("");
      setDescription("");

      document.getElementById("tareas").click();

      if (onTaskUpdated) {
        onTaskUpdated(); // Llama a la función si está definida
      }
    } else {
      setMessage(`❌ Error: ${data.error || "No se pudo editar la tarea"}`);
    }
  };

  return (
    <div>
      <h2>➕ Editar Tarea</h2>
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

        <button type="submit">Editar Tarea</button>
        <Link id="tareas" className="hidden" type="button" to={`/tasks`}>
          Tareas
        </Link>
      </form>
    </div>
  );
}

// ✅ Validar la prop con PropTypes
TaskFormEdit.propTypes = {
  onTaskUpdated: PropTypes.func.isRequired,
};

export default TaskFormEdit;

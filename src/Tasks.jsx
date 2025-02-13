import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importar PropTypes
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [ultasks, setUltasks] = useState(true);

  const [id, setId] = useState(-1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No hay sesión activa. Inicia sesión.");
      return;
    }

    fetch("http://localhost:3000/tasks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.tasks) {
          setTasks(data.tasks);
        } else {
          setError("Error al obtener tareas");
        }
      })
      .catch(() => setError("Error al conectar con el servidor"));
  }, []);

  const handleEditClick = (task) => {
    setEditingTask(task);
    setId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setUltasks(false);
    setMessage("");
  };

  const handleCancel = () => {
    setEditingTask(null);
    setId(-1);
    setTitle("");
    setDescription("");
    setUltasks(true);
    setMessage("");
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("No hay sesión activa. Inicia sesión.");
      return;
    }

    const response = await fetch("http://localhost:3000/tasks/" + id, {
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

      //document.getElementById("form_edit").className="hidden";
      setEditingTask(null);
      setUltasks(true);

      fetch("http://localhost:3000/tasks", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.tasks) {
            setTasks(data.tasks);
          } else {
            setError("Error al obtener tareas");
          }
        })
        .catch(() => setError("Error al conectar con el servidor"));

      //document.getElementById("tareas").click();

      /*if (onTaskUpdated) {
        onTaskUpdated(); // Llama a la función si está definida
      }*/
    } else {
      setMessage(`❌ Error: ${data.error || "No se pudo editar la tarea"}`);
    }
  };

  /*const handleSaveClick = async () => {
    if (editingTask) {
      try {
        const response = await fetch(
          `https://localhost:3000/tasks/${editingTask.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title: updatedTitle }),
          }
        );

        if (response.ok) {
          // Actualizar la lista de tareas con el título editado
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task.id === editingTask.id
                ? { ...task, title: updatedTitle }
                : task
            )
          );
          setEditingTask(null); // Limpiar el formulario de edición
          setUpdatedTitle("");
        } else {
          console.error("Error updating task");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };*/

  return (
    <div className="w600">
      {ultasks && <h2>📋 Lista de Tareas</h2>}
      {!ultasks && <h2>📋 Editar Tarea</h2>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && ultasks && (
        <Link type="button" to={`/taskform`}>
          Agregar nueva tareas
        </Link>
      )}
      {error && (
        <Link type="button" to={`/signin`}>
          Login
        </Link>
      )}
      {ultasks && (
        <ul className="ul_tasks">
          {tasks.map((task) => (
            <li key={task.id}>
              <p>
                <strong>{task.title}</strong> {task.description}
                <button
                  className="btn_edit"
                  onClick={() => handleEditClick(task)}
                >
                  Edit
                </button>
              </p>
            </li>
          ))}
        </ul>
      )}

      {editingTask && (
        <form id="form_edit" onSubmit={handleSubmitEdit}>
          {message ? <p>{message}</p> : ""}
          <input
            type="text"
            value={id}
            className="hidden"
            onChange={(e) => setId(e.target.value)}
          />
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
          <button onClick={() => handleCancel()}>Cancelar</button>
          <Link id="tareas" className="hidden" type="button" to={`/tasks`}>
            Tareas
          </Link>
        </form>
      )}
    </div>
  );
}

TaskList.propTypes = {
  onTaskUpdated: PropTypes.func.isRequired,
};

export default TaskList;

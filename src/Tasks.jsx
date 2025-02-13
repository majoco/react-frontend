import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="w600">
      <h2>📋 Lista de Tareas</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!error && (
        <Link type="button" to={`/taskform`}>
          Agregar nueva tareas
        </Link>
      )}
      {error && (
        <Link type="button" to={`/signin`}>
          Login
        </Link>
      )}
      <ul className="ul_tasks">
        {tasks.map((task) => (
          <li key={task.id}>
            <p>
              <strong>{task.title}</strong> {task.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;

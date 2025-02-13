// EditTask.jsx
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
const EditTask = ({ taskId, onUpdate }) => {
  const [task, setTask] = useState({ title: "" });

  console.log(onUpdate);

  useEffect(() => {
    // Simular una llamada a una API para obtener la tarea por ID
    const fetchTask = async () => {
      // Aquí deberías hacer una llamada real a tu API o base de datos
      const fetchedTask = { id: taskId, title: "Tarea Original" }; // Simulación
      setTask(fetchedTask);
    };

    fetchTask();
  }, [taskId]);

  console.log("taskId: " + taskId);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task);
  };

  return (
    <div>
      <h2>Editar Tarea</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="task-title">Título de la Tarea: {taskId}</label>
          <input
            type="text"
            id="task-title"
            value={task.title}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            required
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditTask;

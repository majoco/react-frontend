import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

//import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviado");

    setError("");

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token); // Guardar token
          console.log("Login exitosos");
          //return <TaskList />;
          document.getElementById("tareas").click();
        } else {
          if (data.error == "Credenciales inválidas") {
            console.log("Error", data.error);
            setError("Credenciales invalidas");
          }
        }
      })
      .catch((error) => {
        if (error == "Credenciales inválidas") {
          console.log("Error 2", error);
        }
      });
  };

  return (
    <div>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <p id="label_error" className="label">
          {error}
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Sign In</button>
        <Link type="button" to={`/`}>
          Back
        </Link>
        <Link id="tareas" className="hidden" type="button" to={`/tasks`}>
          Tareas
        </Link>
      </form>
    </div>
  );
};

export default SignIn;

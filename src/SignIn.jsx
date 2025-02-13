import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

//import { useHistory } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviado");

    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token); // Guardar token
          console.log("Login exitosos");
          //return <TaskList />;
          document.getElementById("tareas").click();
        }
      });
  };

  return (
    <div>
      <h1>SignIn</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

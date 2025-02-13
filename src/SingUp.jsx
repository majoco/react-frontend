import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviado");

    setError("");
    setMensaje("");

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message == "Usuario registrado exitosamente") {
          //localStorage.setItem("token", data.token); // Guardar token
          console.log("Registro exitoso");
          //alert("Registro exitoso");
          setMensaje("Registro exitoso");
          setUsername("");
          setPassword("");
          //document.getElementById("home").click();
        } else if (data.error == "El usuario ya existe") {
          //alert("Usuario ya existe");
          setError("Usuario ya existe");
        } else {
          setError("Error");
        }
      });

    /*fetch("/api/v1/singup", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.error(err);
      });*/
  };

  return (
    <div>
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <p id="label_mensaje" className="label">
          {mensaje}
        </p>
        <p id="label_error" className="label">
          {error}
        </p>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Usuario"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Sign Up</button>
        <Link type="button" to={`/`}>
          Back
        </Link>
        <Link id="home" className="hidden" type="button" to={`/`}>
          Home
        </Link>
      </form>
    </div>
  );
};

export default SignUp;

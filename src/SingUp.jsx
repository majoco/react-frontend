import { useState } from "react";
import "./App.css";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("enviado");

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.message == "Usuario registrado exitosamente") {
          //localStorage.setItem("token", data.token); // Guardar token
          console.log("Registro exitoso");
          alert("Registro exitoso");
          document.getElementById("home").click();
        } else if (data.error == "El usuario ya existe") {
          alert("Usuario ya existe");
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
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Apellido"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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

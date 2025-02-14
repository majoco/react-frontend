import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Prueba React</h1>
      <ul>
        <li>
          <Link to={`/signin`}>Login</Link>
        </li>
        <li>
          <Link to={`/signup`}>Registro</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

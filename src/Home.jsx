import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>React autenticacion con JWT</h1>
      <ul>
        <li>
          <Link to={`/signin`}>Sign In</Link>
        </li>
        <li>
          <Link to={`/signup`}>Sign Up</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;

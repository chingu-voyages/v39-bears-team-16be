import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/register">Register</Link>
        <br />
        <Link to="/login">Login</Link>
        <br />
        <Link to="/classroom">Classroom</Link>
      </nav>
    </div>
  );
}

export default App;

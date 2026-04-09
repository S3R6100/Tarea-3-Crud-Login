import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const success = login(user, pass);

    if (success) {
      navigate("/dashboard");
    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Usuario" onChange={(e) => setUser(e.target.value)} />
        <input type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}

export default Login;
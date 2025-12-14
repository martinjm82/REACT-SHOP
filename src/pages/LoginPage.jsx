import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // LOGIN SIMULADO
    if (username === "admin" && password === "admin") {
      onLogin("admin");
      navigate("/products");
      return;
    }

    if (username === "user" && password === "user") {
      onLogin("user");
      navigate("/products");
      return;
    }

    setError("Usuario o contraseña incorrectos");
  };

  return (
    <div className="card shadow-sm mx-auto mt-5" style={{ maxWidth: 420 }}>
      <div className="card-body">
        <h2 className="h4 fw-bold mb-3">Iniciar sesión</h2>

        <p className="text-muted">
          Login simulado (sin backend)
        </p>

        {error && (
          <div className="alert alert-danger py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Usuario</label>
            <input
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button className="btn btn-dark w-100" type="submit">
            Entrar
          </button>
        </form>

        <hr />

        <div className="text-muted small">
          <strong>Credenciales de prueba:</strong><br />
          Usuario → <code>user / user</code><br />
          Admin → <code>admin / admin</code>
        </div>

        <Link to="/" className="btn btn-link p-0 mt-2">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

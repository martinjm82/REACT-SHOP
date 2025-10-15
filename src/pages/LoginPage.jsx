import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';
export default function LoginPage({ onLogin }) {
const navigate = useNavigate();
return (
<div className="card shadow-sm mx-auto" style={{maxWidth:480}}>
<div className="card-body">
<h2 className="h4 fw-bold">Iniciar Sesión</h2>
<p className="text-muted">Ruta pública. El botón simula autenticación.</p>
<button
onClick={() => { onLogin(); navigate("/account", { replace: true }); }}
className="btn btn-dark w-100 mt-3"
>
Ingresar
</button>
</div>
</div>
);
}
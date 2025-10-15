import React from 'react';
import { Link } from 'react-router-dom';
export default function AccountPage() {
return (
<div className="card shadow-sm">
<div className="card-body">
<h2 className="h4 fw-bold">Mi Cuenta</h2>
<p className="text-muted">Esta es una ruta protegida. Simulá login con el botón de la navbar.</p>
</div>
</div>
);
}
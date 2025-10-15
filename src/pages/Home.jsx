// ------------------------------------------------------------
// Pages & Components
// ------------------------------------------------------------
import React from 'react';
import { Link } from 'react-router-dom';
export default  function Home() {
return (
<section className="row g-4">
<div className="col-lg-8">
<div className="card shadow-sm">
<div className="card-body">
<h1 className="card-title h3 fw-bold">Bienvenido a Martin_shop</h1>
<p className="text-muted mb-2">Demo de eCommerce con carrito para la pre entrega de React</p>
<ul className="mb-3">
<li>Carrito con <code>useState</code> y eventos de clic.</li>
<li>Catálogo desde API pública con <code>useEffect</code>, estados de carga y error.</li>
<li>Rutas con React Router, detalle dinámico y rutas protegidas.</li>
<li>Layout/Navegación con Bootstrap 5.</li>
</ul>
<Link to="/products" className="btn btn-dark">Ver productos</Link>
</div>
</div>
</div>
<div className="col-lg-4">
<div className="card text-bg-dark shadow-sm">
<div className="card-body">
<h2 className="h4">Stack</h2>
<p className="text-white-50 mb-3">React, React Router v6, Bootstrap 5.</p>
<div className="row g-2 small">
<div className="col-6"><div className="p-3 bg-white bg-opacity-10 rounded">API<br/><strong>Fake Store API</strong></div></div>
<div className="col-6"><div className="p-3 bg-white bg-opacity-10 rounded">Carrito<br/><strong>useState + localStorage</strong></div></div>
<div className="col-6"><div className="p-3 bg-white bg-opacity-10 rounded">Rutas<br/><strong>Dinámicas / Protegidas</strong></div></div>
<div className="col-6"><div className="p-3 bg-white bg-opacity-10 rounded">UI<br/><strong>Bootstrap</strong></div></div>
</div>
</div>
</div>
</div>
</section>
);
}
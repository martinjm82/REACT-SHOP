
import React from 'react';
import { Link } from 'react-router-dom';

export default  function ProductsGrid({ products, onAdd }) {
return (
<div className="row g-4">
{products.map((p) => (
<div key={p.id} className="col-sm-6 col-lg-4">
<article className="card h-100 shadow-sm">
<Link to={`/products/${p.id}`} className="text-decoration-none text-reset">
<div className="ratio ratio-1x1 bg-light">
<img src={p.image} alt={p.title} className="p-4" style={{objectFit:"contain"}}/>
</div>
<div className="card-body">
<h3 className="card-title h6 text-truncate">{p.title}</h3>
</div>
</Link>
<div className="card-footer d-flex justify-content-between align-items-center">
<span className="fw-bold">${p.price}</span>
<button onClick={() => onAdd(p)} className="btn btn-sm btn-dark">Agregar</button>
</div>
</article>
</div>
))}
</div>
);
}
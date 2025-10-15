import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
export default  function CartPage({ cart, onSetQty, onRemove }) {
const total = useMemo(() => cart.reduce((acc, it) => acc + it.price * it.qty, 0), [cart]);
if (!cart.length) return (
<div className="card shadow-sm">
<div className="card-body text-center">
Tu carrito está vacío. <Link to="/products" className="fw-semibold">Explorar productos</Link>
</div>
</div>
);


return (
<section className="row g-4">
<div className="col-md-8">
<div className="card shadow-sm">
<div className="card-body">
<h2 className="h5 fw-bold mb-3">Carrito</h2>
<ul className="list-group list-group-flush">
{cart.map((it) => (
<li key={it.id} className="list-group-item d-flex align-items-center gap-3">
<img src={it.image} alt="" className="rounded bg-light" style={{width:80, height:80, objectFit:"contain", padding:8}}/>
<div className="flex-grow-1">
<div className="fw-semibold text-truncate" title={it.title}>{it.title}</div>
<div className="text-muted small">${it.price}</div>
</div>
<div className="d-flex align-items-center gap-2">
<button onClick={() => onSetQty(it.id, it.qty - 1)} className="btn btn-outline-secondary btn-sm">–</button>
<input type="number" value={it.qty} onChange={(e)=> onSetQty(it.id, parseInt(e.target.value||"0",10))} className="form-control form-control-sm text-center" style={{width:72}} />
<button onClick={() => onSetQty(it.id, it.qty + 1)} className="btn btn-outline-secondary btn-sm">+</button>
</div>
<button onClick={() => onRemove(it.id)} className="btn btn-light btn-sm">Quitar</button>
</li>
))}
</ul>
</div>
</div>
</div>
<aside className="col-md-4">
<div className="card shadow-sm">
<div className="card-body">
<h3 className="h6 fw-bold">Resumen</h3>
<div className="d-flex justify-content-between small text-muted">
<span>Subtotal</span>
<span>${total.toFixed(2)}</span>
</div>
<Link to="/checkout" className="btn btn-dark w-100 mt-3">Ir a checkout</Link>
</div>
</div>
</aside>
</section>
);
}





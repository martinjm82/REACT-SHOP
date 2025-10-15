import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import React from 'react';
const API_URL = 'https://fakestoreapi.com/products';

export default function ProductDetail({ onAdd }) {
const { id } = useParams();
const navigate = useNavigate();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
let alive = true;
setLoading(true);
fetch(`${API_URL}/${id}`)
.then((r) => { if (!r.ok) throw new Error("No se encontró el producto"); return r.json(); })
.then((data) => { if (!alive) return; setProduct(data); setError(null); })
.catch((e) => setError(e.message))
.finally(() => alive && setLoading(false));
return () => { alive = false; };
}, [id]);


if (loading) return <div className="card shadow-sm"><div className="card-body">Cargando…</div></div>;
if (error) return <div className="alert alert-danger" role="alert">{error}</div>;
if (!product) return null;


return (
<section className="row g-4">
<div className="col-md-6">
<div className="card shadow-sm">
<div className="ratio ratio-1x1 bg-light">
<img src={product.image} alt={product.title} className="p-4" style={{objectFit:"contain"}}/>
</div>
</div>
</div>
<div className="col-md-6">
<div className="card shadow-sm">
<div className="card-body">
<h1 className="h4 fw-bold">{product.title}</h1>
<p className="text-muted">{product.description}</p>
<div className="display-6 fw-bold">${product.price}</div>
<div className="mt-3 d-flex gap-2">
<button onClick={() => onAdd(product)} className="btn btn-dark">Agregar al carrito</button>
<button onClick={() => navigate(-1)} className="btn btn-outline-secondary">Volver</button>
</div>
</div>
</div>
</div>
</section>
);
}
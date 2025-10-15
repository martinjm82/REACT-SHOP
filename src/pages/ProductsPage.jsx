import ProductsGrid from '../components/ProductsGrid';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';  

const API_URL = 'https://fakestoreapi.com/products';

export default function ProductsPage({ onAdd }) {

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const navigate = useNavigate();
<button onClick={() => { onAdd(p); navigate('/cart'); }} className="btn btn-sm btn-dark">Agregar</button>


useEffect(() => {
let alive = true;
setLoading(true);
fetch(API_URL)
.then((r) => { if (!r.ok) throw new Error("Error al cargar productos"); return r.json(); })
.then((data) => { if (!alive) return; setProducts(data); setError(null); })
.catch((e) => setError(e.message))
.finally(() => alive && setLoading(false));
return () => { alive = false; };
}, []);


if (loading) return <div className="card shadow-sm"><div className="card-body">Cargando productos…</div></div>;
if (error) return <div className="alert alert-danger" role="alert">{error}</div>;


return (
<section>
<h2 className="h4 fw-bold mb-3">Productos</h2>

<ProductsGrid
  products={products}
  onAdd={(p) => { onAdd(p); navigate('/cart'); }}
/>
</section>
);
}


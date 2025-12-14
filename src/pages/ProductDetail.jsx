import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../lib/products/ProductsContext";

export default function ProductDetail({ onAdd }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getById, loading, error } = useProducts();

  if (loading) {
    return <div className="alert alert-info">Cargando producto...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const product = getById(id);

  if (!product) {
    return <div className="alert alert-danger">Producto no encontrado</div>;
  }

  return (
    <section className="row g-4">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="ratio ratio-1x1 bg-light">
            <img
              src={product.image}
              alt={product.title}
              className="p-4"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
      </div>

      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="h4 fw-bold">{product.title}</h1>
            {product.description && (
              <p className="text-muted small">{product.description}</p>
            )}
            <div className="h3 fw-bold">${product.price}</div>

            <div className="d-flex gap-2 mt-3">
              <button className="btn btn-dark" onClick={() => onAdd?.(product)}>
                Agregar al carrito
              </button>
              <button className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
                Volver
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

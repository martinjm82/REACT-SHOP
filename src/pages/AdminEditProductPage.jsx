import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../lib/products/ProductsContext";

export default function AdminEditProductPage() {
  const { id } = useParams();              // ← id de la URL
  const navigate = useNavigate();          // ← navegación
  const { getById } = useProducts();        // ← del context

  const product = getById(id);              // string/number OK

  if (!product) {
    return (
      <section className="container my-4">
        <div className="alert alert-danger">
          Producto no encontrado
        </div>
        <button
          className="btn btn-link"
          onClick={() => navigate("/products")}
        >
          ← Volver
        </button>
      </section>
    );
  }

  return (
    <section className="container my-4">
      <button
        className="btn btn-link mb-3"
        onClick={() => navigate("/products")}
      >
        ← Volver
      </button>

      <ProductForm
        productToEdit={product}
        onDone={() => navigate("/products")}
      />
    </section>
  );
}

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductsGrid from "../components/ProductsGrid";
import { useProducts } from "../lib/products/ProductsContext";

export default function ProductsPage({ onAdd }) {
  const navigate = useNavigate();
  const { products, loading, error, loadProducts } = useProducts();

  useEffect(() => {
    loadProducts();
  }, []);

  if (loading) return <div className="card shadow-sm"><div className="card-body">Cargando productos...</div></div>;
  if (error) return <div className="alert alert-danger" role="alert">{error}</div>;

  return (
    <section>
      <h2 className="h4 fw-bold mb-3">Productos</h2>

      <ProductsGrid
        products={products}
        onAdd={(p) => { onAdd(p); navigate("/cart"); }}
      />
    </section>
  );
}

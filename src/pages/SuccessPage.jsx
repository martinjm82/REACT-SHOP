import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function SuccessPage() {
  const { state } = useLocation();
  const orderId = state?.orderId || 'ORD-XXXX';
  const total = state?.total || '0.00';

  return (
    <div className="card shadow-sm mx-auto" style={{maxWidth:600}}>
      <div className="card-body text-center">
        <h2 className="h4 fw-bold">¡Gracias por tu compra!</h2>
        <p className="text-muted">Tu número de orden es <strong>{orderId}</strong>.</p>
        <p className="mb-3">Total pagado: <strong>${total}</strong></p>
        <Link className="btn btn-dark" to="/products">Seguir comprando</Link>
      </div>
    </div>
  );
}
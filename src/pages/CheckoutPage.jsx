import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ cart, onComplete }) {
  const navigate = useNavigate();
  const subtotal = useMemo(() => cart.reduce((a, it) => a + it.price * it.qty, 0), [cart]);
  const [form, setForm] = useState({ name:'', email:'', address:'', shipping:'standard' });
  const [loading, setLoading] = useState(false);
  const shippingCost = form.shipping === 'express' ? 7.99 : 3.99;
  const total = (subtotal + (cart.length ? shippingCost : 0)).toFixed(2);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function validate() {
  const name = form.name.trim();
  const email = form.email.trim().replace(/\u200B/g, ''); // quita zero-width spaces
  const address = form.address.trim();

  if (!name) return 'Ingresá tu nombre';
  // regex simple y tolerante
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Email inválido';
  if (!address) return 'Ingresá tu dirección';
  if (!cart.length) return 'El carrito está vacío';
  return null;
}
  async function handleSubmit(e) {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);

    setLoading(true);
    // simular procesamiento
    setTimeout(() => {
      const orderId = `ORD-${Date.now().toString(36).toUpperCase()}`;
      onComplete?.(orderId);
      setLoading(false);
      navigate('/success', { replace: true, state: { orderId, total } });
    }, 900);
  }

  return (
    <div className="row g-4">
      <div className="col-md-7">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="h5 fw-bold">Checkout</h2>
            <form onSubmit={handleSubmit} className="mt-3">
              <div className="mb-3">
                <label className="form-label">Nombre y Apellido</label>
                <input className="form-control" name="name" value={form.name} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} autoComplete="email" required/>
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección</label>
                <input className="form-control" name="address" value={form.address} onChange={handleChange}/>
              </div>
              <div className="mb-3">
                <label className="form-label">Envío</label>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="shipping" id="std"
                         value="standard" checked={form.shipping==='standard'} onChange={handleChange}/>
                  <label className="form-check-label" htmlFor="std">Standard (3–5 días) — $3.99</label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="shipping" id="exp"
                         value="express" checked={form.shipping==='express'} onChange={handleChange}/>
                  <label className="form-check-label" htmlFor="exp">Express (24–48h) — $7.99</label>
                </div>
              </div>
              <button className="btn btn-dark" disabled={loading}>
                {loading ? 'Procesando…' : 'Pagar'}
              </button>
            </form>
          </div>
        </div>
      </div>

      <aside className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h3 className="h6 fw-bold">Resumen</h3>
            <ul className="list-group list-group-flush small my-2">
              {cart.map(i => (
                <li key={i.id} className="list-group-item d-flex justify-content-between">
                  <span className="text-truncate" style={{maxWidth:'70%'}}>{i.title} × {i.qty}</span>
                  <span>${(i.price * i.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between text-muted small">
              <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
            </div>
            {cart.length > 0 && (
              <div className="d-flex justify-content-between text-muted small">
                <span>Envío</span><span>${shippingCost.toFixed(2)}</span>
              </div>
            )}
            <div className="d-flex justify-content-between fw-bold border-top pt-2 mt-2">
              <span>Total</span><span>${total}</span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
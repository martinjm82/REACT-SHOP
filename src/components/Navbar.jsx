// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Navbar({ cartCount, isAuthed, onToggleAuth, onClearCart }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">Martin.shop</Link>
        <span className="badge text-bg-dark ms-1">QA </span>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="nav" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink to="/" className="nav-link">Inicio</NavLink></li>
            <li className="nav-item"><NavLink to="/products" className="nav-link">Productos</NavLink></li>
            <li className="nav-item"><NavLink to="/account" className="nav-link">Cuenta</NavLink></li>
            <li className="nav-item"><NavLink to="/checkout" className="nav-link">Checkout</NavLink></li>
            <li className="nav-item">
              <NavLink to="/cart" className="nav-link d-flex align-items-center gap-1">
                <i className="bi bi-cart3" aria-hidden="true"></i>
                <span>Carrito</span>
                <span className="badge text-bg-dark ms-1">{cartCount}</span>
              </NavLink>
            </li>
          </ul>

          {cartCount > 0 && (
            <button
              type="button"
              className="btn btn-outline-danger btn-sm me-2"
              onClick={() => window.confirm('¿Vaciar carrito?') && onClearCart?.()}
            >
              <i className="bi bi-trash3 me-1"></i> Vaciar
            </button>
          )}

          <button onClick={onToggleAuth} className={`btn ${isAuthed ? 'btn-outline-secondary' : 'btn-dark'}`}>
            {isAuthed ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
}

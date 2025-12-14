import React from "react";
import Navbar from "./Navbar.jsx";

export default function Layout({
  children,
  cartCount,
  isAuthed,
  onLogout,
  onClearCart = () => {},
}) {
  return (
    <>
      <Navbar
        cartCount={cartCount}
        isAuthed={isAuthed}
        onLogout={onLogout}
        onClearCart={onClearCart}
      />
      <main className="container my-4">{children}</main>
      <footer className="border-top py-4 text-center text-muted small">
        Trabajo realizado por Martin Maccorin · React + Router + Bootstrap
      </footer>
    </>
  );
}

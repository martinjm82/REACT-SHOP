import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { addItem, setQty, removeItem } from "./lib/cart.js";

import Layout from "./components/Layout.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import AccountPage from "./pages/AccountPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import SuccessPage from "./pages/SuccessPage.jsx";

import AdminEditProductPage from "./pages/AdminEditProductPage.jsx";

export default function App() {
  // Auth con roles: guest | user | admin
  const [auth, setAuth] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auth")) ?? { role: "guest" };
    } catch {
      return { role: "guest" };
    }
  });

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const isAdmin = auth.role === "admin";

  // Estado del carrito
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("Martin_shop_cart")) ?? [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("Martin_shop_cart", JSON.stringify(cart));
  }, [cart]);

  const cartCount = cart.reduce((acc, x) => acc + x.qty, 0);

  const handleAdd = (product) => setCart((c) => addItem(c, product));
  const handleSetQty = (id, qty) => setCart((c) => setQty(c, id, qty));
  const handleRemove = (id) => setCart((c) => removeItem(c, id));
  const handleClear = () => setCart([]);

  return (
    <BrowserRouter>
      <Layout
  cartCount={cartCount}
  isAuthed={auth.role !== "guest"}
  onLogout={() => setAuth({ role: "guest" })}
  onClearCart={handleClear}
>

        <Routes>
          <Route path="/" element={<Home />} />

          {/* Catálogo */}
          <Route
            path="/products"
            element={<ProductsPage onAdd={handleAdd} isAdmin={isAdmin} />}
          />
          <Route
            path="/products/:id"
            element={<ProductDetail onAdd={handleAdd} />}
          />

          {/* Carrito */}
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onSetQty={handleSetQty}
                onRemove={handleRemove}
              />
            }
          />

          {/* Login */}
          <Route
            path="/login"
            element={<LoginPage onLogin={(role) => setAuth({ role })} />}
          />

          {/* Cuenta (protegida: user o admin) */}
          <Route
            path="/account"
            element={
              <ProtectedRoute auth={auth} requiredRole="user">
                <AccountPage />
              </ProtectedRoute>
            }
          />

          {/* Checkout (protegida: user o admin) */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute auth={auth} requiredRole="user">
                <CheckoutPage
                  cart={cart}
                  onComplete={(orderId) => {
                    const orders = JSON.parse(
                      localStorage.getItem("orders") || "[]"
                    );
                    localStorage.setItem(
                      "orders",
                      JSON.stringify([...orders, { orderId, items: cart }])
                    );
                    setCart([]);
                  }}
                />
              </ProtectedRoute>
            }
          />

          {/* Success (protegida: user o admin) */}
          <Route
            path="/success"
            element={
              <ProtectedRoute auth={auth} requiredRole="user">
                <SuccessPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN edit (protegida: admin) */}
          <Route
            path="/admin/products/:id/edit"
            element={
              <ProtectedRoute auth={auth} requiredRole="admin">
                <AdminEditProductPage />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={<div className="alert alert-warning">Página no encontrada</div>}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

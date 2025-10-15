
import {BrowserRouter,Routes,Route,} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { addItem, setQty, removeItem } from './lib/cart.js'; 
import Layout from './components/Layout.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './pages/Home.jsx';
import SuccessPage from './pages/SuccessPage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import CartPage from './pages/CartPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AccountPage from './pages/AccountPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

// ------------------------------------------------------------
// App (estado global simple con useState) – Pre‑entregas #1 a #4
// ------------------------------------------------------------
export default function App() {
// Auth simulada para rutas protegidas
const [isAuthed, setIsAuthed] = useState(false);


// Estado del carrito – Requerimiento #1

const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('solshop_cart')) ?? []; } catch { return []; }
  });


useEffect(() => {localStorage.setItem("Martin_shop_cart", JSON.stringify(cart));}, [cart]);

const cartCount = cart.reduce((acc, x) => acc + x.qty, 0);
const handleAdd = (product) => setCart((c) => addItem(c, product));
const handleSetQty = (id, qty) => setCart((c) => setQty(c, id, qty));
const handleRemove = (id) => setCart((c) => removeItem(c, id));
const handleClear = ()        => setCart([]);                  

return (
<BrowserRouter>

<Layout
  cartCount={cartCount}
  isAuthed={isAuthed}
  onToggleAuth={() => setIsAuthed(x => !x)}
  onClearCart={handleClear}      
>
 
{/* rutas */}
<Routes>
{/* Home */}
<Route path="/" element={<Home />} />
{/* Catálogo desde API con carga/errores (useEffect/useState) – Req #2 */}
<Route path="/products" element={<ProductsPage onAdd={handleAdd} />} />
{/* Ruta dinámica de producto */}
<Route path="/products/:id" element={<ProductDetail onAdd={handleAdd} />} />
{/* Carrito – Req #1 ampliado */}
<Route path="/cart" element={<CartPage cart={cart} onSetQty={handleSetQty} onRemove={handleRemove} />} />

{/* Login público */}
<Route path="/login" element={<LoginPage onLogin={() => setIsAuthed(true)} />} />
{/* Rutas protegidas */}
<Route path="/account" element={<ProtectedRoute isAuthed={isAuthed}> <AccountPage /></ProtectedRoute>}/>
<Route path="/checkout" element={<ProtectedRoute isAuthed={isAuthed}><CheckoutPage cart={cart} /></ProtectedRoute>}/>
{/* Carrito */}
<Route path="/cart" element={<CartPage cart={cart} onSetQty={handleSetQty} onRemove={handleRemove} />} />
{/* 404 */}
<Route path="*" element={<div className="alert alert-warning">Página no encontrada</div>} />
// imports arriba
import SuccessPage from './pages/SuccessPage.jsx';

<Route path="/checkout" element={
<ProtectedRoute isAuthed={isAuthed}><CheckoutPage cart={cart} onComplete={(orderId) => {
          // guardá la orden  
          const orders = JSON.parse(localStorage.getItem('orders') || '[]');
          localStorage.setItem('orders', JSON.stringify([...orders, { orderId, items: cart }]));
          // vaciar carrito
          setCart([]);
        }}/>
</ProtectedRoute>
  }/>

<Route path="/success" element={<ProtectedRoute isAuthed={isAuthed}><SuccessPage /></ProtectedRoute>}/>
</Routes>
</Layout>
</BrowserRouter>
);
}


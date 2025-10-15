export function addItem(cart, product) {
  const i = cart.findIndex(c => c.id === product.id);
  if (i >= 0) {
    const next = [...cart];
    next[i] = { ...next[i], qty: next[i].qty + 1 };
    return next;
  }
  return [...cart, { id: product.id, title: product.title, price: product.price, image: product.image, qty: 1 }];
}

export function setQty(cart, productId, qty) {
  if (qty <= 0) return cart.filter(c => c.id !== productId);
  return cart.map(c => (c.id === productId ? { ...c, qty } : c));
}

export function removeItem(cart, productId) {
  return cart.filter(c => c.id !== productId);
}
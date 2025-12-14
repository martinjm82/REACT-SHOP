
const API_URL = "https://fakestoreapi.com/products"; // API pública de prueba

export async function getProducts() {
  const res = await fetch("https://fakestoreapi.com/products");
  return res.json();
}
// product.js
// Simulated product database
// Acts as a single source of truth for products
const products = [
  { id: 1, name: 'Laptop', price: 50000, stock: 10, category: 'electronics' },
  { id: 2, name: 'Phone', price: 30000, stock: 15, category: 'electronics' },
  { id: 3, name: 'Headphones', price: 2000, stock: 25, category: 'accessories' },
  { id: 4, name: 'Mouse', price: 500, stock: 50, category: 'accessories' },
  { id: 5, name: 'Keyboard', price: 1500, stock: 30, category: 'accessories' }
];
// Fetch a product using its unique ID
export function getProductById(id) {
  return products.find(product => product.id === id);
}
// Return complete product list
export function getAllProducts() {
  return products;
}
// Filter products based on category
export function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}
// Search products by name (case-insensitive)
export function searchProducts(query) {
  return products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );
}
// Check whether required quantity is available in stock
export function checkStock(productId, quantity) {
  const product = getProductById(productId);
  return product && product.stock >= quantity;
}
// Reduce stock after successful purchase
export function reduceStock(productId, quantity) {
  const product = getProductById(productId);
  if (product) {
    product.stock -= quantity;
  }
}
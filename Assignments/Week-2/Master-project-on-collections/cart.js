// cart.js
import { getProductById, checkStock } from './product.js';
// Stores items added to cart
let cartItems = [];
// Add product to cart
export function addToCart(productId, quantity) {
  const product = getProductById(productId);
  // Validate product existence
  if (!product) return "Product not found";
  // Validate stock availability
  if (!checkStock(productId, quantity)) {
    return "Insufficient stock";
  }
  // Check if item already exists in cart
  const existingItem = cartItems.find(item => item.productId === productId);
  if (existingItem) {
    // Update quantity if already present
    if (!checkStock(productId, existingItem.quantity + quantity)) {
      return "Insufficient stock";
    }
    existingItem.quantity += quantity;
  } else {
    // Add new item to cart
    cartItems.push({ productId, quantity });
  }
  return "Item added to cart successfully";
}
// Remove item from cart
export function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.productId !== productId);
  return "Item removed from cart";
}
// Update quantity of an existing cart item
export function updateQuantity(productId, newQuantity) {
  if (!checkStock(productId, newQuantity)) {
    return "Insufficient stock";
  }

  const item = cartItems.find(item => item.productId === productId);
  if (!item) return "Item not found in cart";

  item.quantity = newQuantity;
  return "Quantity updated successfully";
}
// Return cart items with full product details
export function getCartItems() {
  return cartItems.map(item => {
    const product = getProductById(item.productId);
    return {
      ...product,
      quantity: item.quantity,
      totalPrice: product.price * item.quantity
    };
  });
}
// Calculate total price of cart
export function getCartTotal() {
  return getCartItems()
    .reduce((total, item) => total + item.totalPrice, 0);
}
// Clear cart after checkout
export function clearCart() {
  cartItems = [];
}
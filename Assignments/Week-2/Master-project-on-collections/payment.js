// payment.js
import { reduceStock } from './product.js';
import { getCartItems, getCartTotal, clearCart } from './cart.js';
import { applyDiscount } from './discount.js';
// Validate allowed payment methods
export function validatePaymentMethod(method) {
  return ['card', 'upi', 'cod'].includes(method);
}
// Main checkout function
export function processPayment(paymentMethod, couponCode = null) {
  if (!validatePaymentMethod(paymentMethod)) {
    return { status: 'failed', message: 'Invalid payment method' };
  }
  const items = getCartItems();
  const subtotal = getCartTotal();
  let discount = 0;
  let total = subtotal;
  // Apply coupon if provided
  if (couponCode) {
    const discountResult = applyDiscount(subtotal, couponCode, items);
    discount = discountResult.discount;
    total = discountResult.finalTotal;
  }
  // Reduce stock after payment
  items.forEach(item => {
    reduceStock(item.id, item.quantity);
  });
  // Clear cart after order success
  clearCart();
  return {
    orderId: generateOrderId(),
    items,
    subtotal,
    discount,
    total,
    paymentMethod,
    status: 'success',
    message: 'Order placed successfully'
  };
}
// Generate unique order ID
function generateOrderId() {
  return 'ORD' + Date.now();
}
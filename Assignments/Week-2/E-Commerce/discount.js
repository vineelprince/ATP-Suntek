
// discount.js
// Predefined coupons
const coupons = {
  WELCOME10: { type: 'percentage', value: 10, minAmount: 1000 },
  FLAT500: { type: 'flat', value: 500, minAmount: 5000 },
  ELECTRONICS20: { type: 'percentage', value: 20, minAmount: 10000, category: 'electronics' }
};
// Validate coupon rules
export function validateCoupon(couponCode, cartTotal, cartItems) {
  const coupon = coupons[couponCode];
  if (!coupon) {
    return { valid: false, message: "Invalid coupon code" };
  }
  if (cartTotal < coupon.minAmount) {
    return { valid: false, message: "Minimum purchase amount not met" };
  }
  // Check category constraint (if applicable)
  if (coupon.category) {
    const eligible = cartItems.some(item => item.category === coupon.category);
    if (!eligible) {
      return { valid: false, message: "Coupon not applicable to cart items" };
    }
  }
  return { valid: true, message: "Coupon valid" };
}
// Calculate discount amount
export function calculateDiscount(couponCode, cartTotal) {
  const coupon = coupons[couponCode];

  if (coupon.type === 'percentage') {
    return (cartTotal * coupon.value) / 100;
  }

  return coupon.value;
}
// Apply discount and return billing details
export function applyDiscount(cartTotal, couponCode, cartItems) {
  const validation = validateCoupon(couponCode, cartTotal, cartItems);
  if (!validation.valid) {
    return {
      originalTotal: cartTotal,
      discount: 0,
      finalTotal: cartTotal,
      message: validation.message
    };
  }
  const discount = calculateDiscount(couponCode, cartTotal);
  return {
    originalTotal: cartTotal,
    discount,
    finalTotal: cartTotal - discount,
    message: "Discount applied successfully"
  };
}

export const getDiscount = (
  originalPrice: number,
  discountPercentage: number
): string => {
  const discount = originalPrice * (discountPercentage / 100);
  const priceWithDiscount = originalPrice - discount;

  return Math.abs(priceWithDiscount).toFixed(2);
};

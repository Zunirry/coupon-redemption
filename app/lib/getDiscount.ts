export const getDiscount = (
  originalPrice: number,
  discountPercentage: number
): number => {
  const discount = originalPrice * (discountPercentage / 100);
  const priceWithDiscount = originalPrice - discount;

  return priceWithDiscount;
};

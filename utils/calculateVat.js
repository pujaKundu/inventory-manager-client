export function calculateTotalPrice(numberOfItems,priceOfSingleItem, vatRate) {
  const singleItemVAT = parseInt(priceOfSingleItem) * (vatRate / 100);
  const totalPrice = numberOfItems * parseInt(priceOfSingleItem);
  const totalVAT = singleItemVAT * numberOfItems;
  return totalVAT + totalPrice;
}
export function calculateTotalPrice(numberOfItems,priceOfSingleItem, vatRate) {
  const singleItemVAT = priceOfSingleItem * (vatRate / 100);
  const totalPrice = numberOfItems * priceOfSingleItem;
  const totalVAT = singleItemVAT * numberOfItems;
  return totalVAT + totalPrice;
}
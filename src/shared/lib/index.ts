export const getPrice = (price: number | string) => {
  const price_format = new Intl.NumberFormat('ru-RU').format(+price);
  return price_format + ' ₽';
};

/**
 * e.g. `12000000.0` -> `12.000.000₫`
 * @param numeric numeric(x,y) from postgres
 */
export default function formatPrice(numeric: string) {
  const wholeStr = numeric.split('.')[0];
  const wholeNum = Number(wholeStr);
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'vnd',
  })
    .format(wholeNum)
    .replace(/\s/, '');

  return formatted;
}

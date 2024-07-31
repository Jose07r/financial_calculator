export function formatNumberWithCommas(x) {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function parseNumber(formattedNumber) {
  return parseFloat(formattedNumber.replace(/,/g, ''));
}

export function formatNumberWithCommas(x) {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export function parseNumber(formattedNumber) {
  let cleanedNumber = formattedNumber.replace(/,/g, '');
  cleanedNumber = cleanedNumber.replace(/^0+/, '') || '0';
  return parseFloat(cleanedNumber);
}

export const capitalizeFirstLetter = (text: string) => {
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function formatDecimalSeparator(whole: string) {
  let result = "";
  let digits = 0;
  for (let i = whole.length - 1; i >= 0; i--) {
    result = whole[i] + result;

    if (++digits % 3 === 0 && i > 0) {
      result = "." + result;
    }
  }
  return result;
}

export function formatAmount(subtotal: number) {
  const decimalAmount = `${subtotal}`;
  const [whole, fraction] = decimalAmount.split(".");
  const wholeFormatted = formatDecimalSeparator(whole);
  if (decimalAmount.includes(".")) {
    return `${wholeFormatted},${fraction.slice(0, 2)}`;
  } else {
    return `${wholeFormatted},00`;
  }
}
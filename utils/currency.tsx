export const addDecimalSeparator = (
  value: string,
  decimalSeparator: string
) => {
  let newValue = removeDecimalSeparator(value, decimalSeparator);
  // newValue = newValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  newValue = newValue
    .replace(/[^\d.,]+/g, "")
    .replace(/[.,](?![^,.]*$)/g, "")
    .replace(",", ".")
    .replace(/(\.\d{2})\d*$/, "$1")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + decimalSeparator);
  return newValue;
};

export const removeDecimalSeparator = (
  value: string,
  decimalSeparator: string
) => {
  const newValue = value.replaceAll(decimalSeparator, "").split("").join("");
  return newValue;
};

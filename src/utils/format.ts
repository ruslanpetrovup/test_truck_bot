/**
 * Форматирует число с разделителем разрядов.
 * @param value — число
 * @param separator — разделитель (по умолчанию ","); для пробела передать " "
 */
export function formatNumberWithCommas(
  value: number,
  separator: string = ","
): string {
  const formatted = value.toLocaleString("en-US");
  return separator === "," ? formatted : formatted.replace(/,/g, separator);
}

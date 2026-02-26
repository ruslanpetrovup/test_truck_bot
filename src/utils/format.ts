/**
 * Форматирует число, разделяя разряды запятыми (например: 1 000 000 → "1,000,000").
 */
export function formatNumberWithCommas(value: number): string {
  return value.toLocaleString("en-US");
}

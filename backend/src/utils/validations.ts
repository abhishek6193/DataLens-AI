// validate if it's a valid month
export function isValidMonth(month: string) {
  return /^\d{4}-\d{2}$/.test(month);
}

// a generic function to accept any type array as long as that type has month property
// returns the filtered array of the input type by month
export function filterByMonth<T extends { month: string }>(
  data: T[],
  month: string
): T[] {
  return data.filter((row) => row.month === month);
}

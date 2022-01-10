export function addDays(date: string, days: number) {
  return new Date(new Date(date).getTime() + days * 86_400_000).toISOString();
}

export function updatedDay(
  published: string,
  committedAt: string | null,
): string | null {
  if (!committedAt) return null;
  const day = committedAt.slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day) || day === published) return null;
  return day;
}

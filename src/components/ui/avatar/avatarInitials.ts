/**
 * Up to two letters from a name: the first letter of the first word and of the last
 * ("Ada Lovelace" → "AL", "ada" → "A"). Whole characters, so a letter outside the
 * Basic Multilingual Plane is never split.
 */
export function getInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = Array.from(words[0])[0] ?? '';
  const last = words.length > 1 ? Array.from(words[words.length - 1])[0] ?? '' : '';
  return (first + last).toLocaleUpperCase();
}

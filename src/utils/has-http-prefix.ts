export function hasHttpPrefix(url: string): boolean {
  const regex = /^https?:\/\//;
  return regex.test(url);
}
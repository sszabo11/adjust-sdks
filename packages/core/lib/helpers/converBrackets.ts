export function convertBracketsToColons(path: string) {
  return path.replace(/\[([^\]]+)\]/g, ":$1");
}

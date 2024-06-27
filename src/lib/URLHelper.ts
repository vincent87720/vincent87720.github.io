export function removeTrailingSlash(str: string) {
  if (str === "/") return str;
  return str.replace(/\/+$/, "");
}

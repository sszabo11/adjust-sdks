import { convertBracketsToColons } from "../helpers/converBrackets.js";

export function get_pathname({
  params,
  pattern,
  pathname,
}: {
  params: Record<string, string>;
  pattern: string;
  pathname: string;
}) {
  let patt = pattern && convertBracketsToColons(pattern);

  return params && patt ? patt : pathname;
}

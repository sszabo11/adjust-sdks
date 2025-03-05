import { EditorElement } from "../types.js";

export function findFonts(elements: EditorElement[]) {
  return elements
    .map((e) => {
      if (e.type === "text" && e.font) {
        return e.font.family;
      }
    })
    .filter((f) => f !== undefined);
}

export function loadFonts(fonts: string[]) {
  //WebFont.load({
  //  google: {
  //    families: fonts,
  //  },
  //});
}

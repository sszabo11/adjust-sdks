import { Props } from "../types.js";

export function check_props(
  { name, group, key }: Props,

  {
    element,
    container_element,
  }: { element: HTMLDivElement; container_element: HTMLDivElement },
): { error: string | null; code_error: string | null } {
  let error: string | null = null;
  let code_error: string | null = null;

  if (!name) {
    return { error: "No name provided for ad unit", code_error: null };
  }

  let parent = container_element.parentElement;

  if (!parent) {
    return { error: "No parent for ad unit", code_error: null };
  }

  if (
    !parent?.children ||
    parent.children.length !== 1 ||
    parent.children[0].id !== "ad-unit"
  ) {
    console.log(parent, parent.children);

    let tag = parent.tagName;
    let className = parent.className;
    let children: string[] = [];
    children.push(`<${tag.toLowerCase()} class="${className}">`);

    for (let i = 0; i < parent.children.length; i++) {
      let id = parent.children.item(i)!.id;
      if (id === "ad-unit") {
        children.push("   <Ad />  // There should only be one");
      } else {
        let tag = parent.children.item(i)!.tagName;
        let className = parent.children.item(i)!.className;
        children.push(
          `   <${tag.toLowerCase()} class="${className}" id="${id}"></${tag.toLowerCase()} />`,
        );
      }
    }
    children.push(`</${tag.toLowerCase()} >`);
    code_error = children.join("\n");
    return { error: "Please only provide one Ad per parent", code_error };
  }

  if (group && !key) {
    return {
      error: "Please provide key with a dynamic ad",
      code_error: '<Ad key="your_key"/>',
    };
  }

  return { error, code_error };
}

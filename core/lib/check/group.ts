import { Props } from "../types.js";

export function check_group(
  group_name: string | undefined,
  { group, key }: Props,
  { container }: { container: HTMLDivElement },
) {
  let group_element: HTMLElement | null = container;
  let group_tag = "";

  if (group && key) {
    while (group_element && group_element.tagName !== "BODY") {
      group_element = group_element.parentElement;
      if (!group_element) return;

      let index_of_element = group_element
        ? Array.from(group_element.children).findIndex(
          (e) => e === group_element,
        )
        : -1;
      group_tag += `${group_element.tagName}-${Array.from(group_element.classList).join("")}-${group_element.id}-${index_of_element}`;

      console.log("group", group_element);
      if (group_element && group_element.dataset.groupName) {
        break;
      }
    }
  }

  let is_group = true;

  if (!group_element.dataset.groupName) {
    is_group = false;
  }

  if (!group || !key) {
    is_group = false;
  }

  let unit_key_name = group_name && group_name + "-" + key;
  return { is_group, unit_key_name };
}

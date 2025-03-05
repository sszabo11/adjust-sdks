export function get_size({
  element,
  parent,
}: {
  element: HTMLDivElement;
  parent: HTMLDivElement;
}) {
  if (!element) return;

  let rect = element.getBoundingClientRect();
  console.log(
    rect,
    window.getComputedStyle(element),
    element,
    element.clientHeight,
  );

  let computedStyle = window.getComputedStyle(element);

  console.log("height str", computedStyle.height);
  let width = Number(computedStyle.width.split("px")[0]);
  let height = Number(computedStyle.height.split("px")[0]);

  console.log("width: ", width);
  console.log("height: ", height);

  // Calculate ratio of ad
  let ratio = width / height;

  console.log(parent.parentElement, parent);
  let index_of_element = parent.parentElement
    ? Array.from(parent.parentElement.children).findIndex((e) => e === parent)
    : -1;

  console.log(index_of_element);

  let curr_element: HTMLElement | null = element;
  let dynamic: string | null = null;
  while (curr_element && curr_element.tagName !== "BODY") {
    let index_of_element = curr_element.parentElement
      ? Array.from(curr_element.parentElement.children).findIndex(
        (e) => e === curr_element,
      )
      : -1;
    let groupName = curr_element.parentElement?.dataset.groupName;
    if (groupName) {
      dynamic = groupName;
    }

    if (curr_element.parentElement) {
      curr_element = curr_element.parentElement;
    } else {
      break;
    }
  }

  return { ratio, width: rect.width, height: rect.height };
}

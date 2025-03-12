export function check_viewport({
  container,
  name,
}: {
  container: HTMLDivElement;
  name: string;
}): boolean {
  let container_rect = container.getBoundingClientRect();

  if (
    container_rect.top >= 0 &&
    container_rect.left >= 0 &&
    container_rect.bottom <=
    (window.innerHeight || document.documentElement.clientHeight) &&
    container_rect.right <=
    (window.innerWidth || document.documentElement.clientWidth)
  ) {
    console.log("!Element is in viewport", name);
    return true;
  } else {
    console.log("!Element is not in viewport", name);
    return false;
  }
}

export function check_viewport({
  container,
}: {
  container: HTMLDivElement;
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
    console.log("!Element is in viewport");
    return true;
  } else {
    return false;
  }
}

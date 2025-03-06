export function check_viewport({
  container,
}: {
  container: HTMLDivElement;
}): boolean {
  console.log("Fwe", container, container.getBoundingClientRect());
  let container_rect = container.getBoundingClientRect();

  console.log(
    "vne",
    container_rect.top,
    container_rect.left,
    container_rect.bottom,
    window.innerHeight || document.documentElement.clientHeight,
    container_rect.right,
    window.innerWidth || document.documentElement.clientWidth,
  );

  return (
    container.offsetTop < window.pageYOffset + window.innerHeight &&
    container.offsetLeft < window.pageXOffset + window.innerWidth &&
    container.offsetTop + container.offsetHeight > window.pageYOffset &&
    container.offsetLeft + container.offsetWidth > window.pageXOffset
  );
  //if (
  //  container_rect.top >= 0 &&
  //  container_rect.left >= 0 &&
  //  container_rect.bottom <=
  //  (window.innerHeight || document.documentElement.clientHeight) &&
  //  container_rect.right <=
  //  (window.innerWidth || document.documentElement.clientWidth)
  //) {
  //  console.log("!Element is in viewport");
  //  return true;
  //} else {
  //  return false;
  //}
}

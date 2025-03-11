export function main() {
  if (!document || !window) {
    console.error("No document or window");
  }

  let adUnits: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#ad-unit");

  adUnits.forEach((unit) => {
    console.log("cunrtit", unit);
    console.log("ad unit id: ", unit.dataset.adUnitId);
  });
}

export function main() {
  if (!document || !window) {
    console.error("No document or window");
  }

  let adUnits: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#ad-unit");

  adUnits.forEach((unit) => {
    console.log("ccunrtic", unit);
    console.log("ad unittt idd: ", unit.dataset.adUnitId);
  });
}

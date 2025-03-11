export function main() {
  if (!document || !window) {
    console.error("No document or window");
  }

  let adUnits: NodeListOf<HTMLDivElement> =
    document.querySelectorAll("#ad-unit");

  adUnits.forEach((unit) => {
    console.log("cunrtic", unit);
    console.log("ad unitt idd: ", unit.dataset.adUnitId);
  });
}

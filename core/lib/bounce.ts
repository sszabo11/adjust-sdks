export function bounce(page_time: number) {
  document.addEventListener("visibilitychange", (event) => {
    if (!page_time) return;
    if (document.visibilityState == "visible") {
      console.log("tab is active");
      let duration = performance.now() - page_time;
      console.log("Bounce time: ", duration.toFixed(2), "ms");
    } else {
      console.log("tab is inactivee");
    }
  });
  console.info(performance.navigation.type);
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.info("This page is reloaded");
  } else {
    console.info("This page is not reloaded");
  }
}

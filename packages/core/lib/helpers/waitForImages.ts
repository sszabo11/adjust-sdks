export async function waitForImages(images: HTMLImageElement[], name?: string) {
  await Promise.all(
    images.map((im) => new Promise((resolve) => (im.onload = resolve))),
  ).then(() => {
    console.log("The images have loaded for: ", name);
    return true;
  });
}

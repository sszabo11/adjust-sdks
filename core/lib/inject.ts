import { display } from "./display.js";
import { waitForImages } from "./helpers/waitForImages.js";
import { Props } from "./types.js";
import { findFonts, loadFonts } from "./utils/fonts.js";

export async function inject(
  {
    element,
    priority,
    in_viewport,
    is_dev,
    api_key,
  }: {
    in_viewport: boolean;
    element: HTMLDivElement;
    priority: number;
    is_dev: boolean;
    api_key: string;
  },
  { borderRadius, name }: Props,
  data: any,
): Promise<{
  error: string | null;
  size_id?: number;
  ad_id?: number;
  html?: HTMLAnchorElement;
  ad_unit_id?: number;
  dimensions?: any;
}> {
  console.log("Loading ad...", in_viewport, element);
  let {
    error: err,
    html,
    response,
    new: dimensions,
    ad_id,
    elements,
    size_id,
  } = await display({
    body: data as any,
    borderRadius: borderRadius || 0,
    priority,
    api_key,
    is_dev: is_dev,
  });

  if (err) {
    console.log("errerrer", err);
    return { error: err };
  }

  let error = "";
  console.log(response, err);

  if (err && err.includes("api key does not exist")) {
    return {
      error: `API key does not exist. View your API keys at https://adjustv4.vercel.app/site/dashboard/keys`,
    };
  }

  if (
    err &&
    err.includes('duplicate key value violates unique constraint "uq_ad_unit"')
  ) {
    return { error: `Ad units do not have unique names: ${name}` };
  }

  let server_click = "/";
  if (err) {
    console.error("query error", err);
    error = err;
  } else if (html) {
    html.href = is_dev
      ? ""
      : !error
        ? `${server_click}?id=${size_id}_${ad_id}_${response.ad_unit_id}`
        : "";

    element.appendChild(html);
  }
  let images = [...html.querySelectorAll("img")];
  let fonts = findFonts(elements!);
  loadFonts(fonts);
  await waitForImages(images);

  return {
    error,
    size_id,
    ad_id,
    html,
    ad_unit_id: response.ad_unit_id,
    dimensions,
  };
}

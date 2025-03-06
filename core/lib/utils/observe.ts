import { inject } from "../inject.js";
import { Props } from "../types.js";

export function observe(
  {
    in_viewport,
    is_dev,
    env,
    element,
    priority,
  }: {
    in_viewport: boolean;
    element: HTMLDivElement;
    env: Record<string, string>;
    is_dev: boolean;
    priority: number;
  },
  props: Props,
  data: any,
  callback: () => void,
  onerror?: (err: string) => void,
) {
  const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        console.log(
          "Element is in the viewport!",
          entry,
          in_viewport,
          element.parentElement!,
        );

        if (!in_viewport) {
          console.log("GEr", element, priority);
          let { error } = await inject(
            {
              element,
              priority,
              in_viewport,
              api_key: env.PUBLIC_API_KEY,
              is_dev,
            },
            props,
            data,
          );

          if (error && onerror) {
            onerror(error);
          }
          callback();
          return false;
        }
      } else {
        console.log("Element is out of the viewport!", entry, in_viewport);
      }
    });
  });
  intersectionObserver.observe(element.parentElement!);
}

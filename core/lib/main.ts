import { check_viewport } from "./check/viewport.js";
import { generateHTML } from "./generateHTML.js";
import { waitForImages } from "./helpers/waitForImages.js";
import { scheduler } from "./schedular.js";
import { server_url } from "./server.js";
import { Props } from "./types.js";
import { findFonts, loadFonts } from "./utils/fonts.js";

export interface Data {
  name: string;
  group: string | null;
  key: string | null;
  is_dev: boolean;
  api_key: string | undefined;
  in_viewport: boolean;
  priority?: number;
  element: HTMLDivElement;
  path: string;
}

export class Unit {
  name: string;
  group: string;
  key: string;
  is_dev: boolean;
  api_key: string | undefined;
  in_viewport: boolean;
  priority: number;
  errors: string[];
  parent: HTMLDivElement;
  element: HTMLDivElement;
  path: string;
  width: number;
  height: number;
  ratio: number;
  props: Props;

  constructor(data: Data, props: Props) {
    this.name = data.name;
    this.group = data.group;
    this.key = data.key;
    this.is_dev = data.is_dev;
    this.api_key = data.api_key;
    this.priority = data.priority ?? 1;
    this.parent = data.element.parentElement as HTMLDivElement;
    this.element = data.element;
    this.path = data.path;
    this.in_viewport = check_viewport({
      container: this.parent,
      name: this.group ?? this.name,
    });
    this.errors = [];
    this.props = props;

    let { width, height, ratio } = this.get_size(this.element);
    console.log(width, height);
    this.width = width;
    this.height = height;
    this.ratio = ratio;
  }

  get_errors() {
    return this.errors;
  }

  get_size(element: HTMLDivElement) {
    let rect = element.getBoundingClientRect();

    let computedStyle = window.getComputedStyle(element);

    let width = Number(computedStyle.width.split("px")[0]);
    let height = Number(computedStyle.height.split("px")[0]);

    console.log(width, height);

    // Calculate ratio of ad
    let ratio = width / height;

    return { ratio, width: rect.width, height: rect.height };
  }

  get_group() {
    let group_element: HTMLElement | null = this.parent;
    let group_tag = "";

    if (this.group && this.key) {
      while (group_element && group_element.tagName !== "BODY") {
        group_element = group_element.parentElement;
        if (!group_element) return;

        let index_of_element = group_element
          ? Array.from(group_element.children).findIndex(
              (e) => e === group_element,
            )
          : -1;
        group_tag += `${group_element.tagName}-${Array.from(group_element.classList).join("")}-${group_element.id}-${index_of_element}`;

        console.log("group", group_element);
        if (group_element && group_element.dataset.groupName) {
          break;
        }
      }
    }

    let is_group = true;

    if (!group_element.dataset.groupName) {
      is_group = false;
    }

    if (!this.group || !this.key) {
      is_group = false;
    }

    let unit_key_name = this.group && this.group + "-" + this.key;
    return { is_group, unit_key_name };
  }

  analyze() {
    let { is_group, unit_key_name } = this.get_group();
    let data = {
      ...this.props,
      ad_unit_tag: "banana",
      ad_unit_name: unit_key_name ?? this.name,
      ad_unit_group: is_group ? this.group : null,
      ad_unit_type: is_group && this.group ? "group" : "page",
      key: this.key,
      in_viewport: this.in_viewport,
      endpoint: this.path,
      tags: this.props.tags ?? ["gym", "equipment", "fitness"],
      category: this.props.category ?? "Educational Toys",

      region: this.props.region ?? "JP",
      context: this.props.context,
      language: "fr",
      gender: "any",
      ratio: this.ratio,
      fill: this.props.fill ?? "",
      width: this.width,
      height: this.height,
    };

    console.log("data", data);

    return data;
  }

  async fetch() {
    console.log("ratio", this.ratio);
    // Check if ratio exists
    if (isNaN(this.ratio) || !isFinite(this.ratio)) {
      this.errors.push("Please specify width and height");
      return {
        error: "Please specify width and height",
        html: undefined,
        response: undefined,
        new: undefined,
        elements: undefined,
      };
    }

    let body = this.analyze();

    // Query ad with body
    const response: any = await this.query(body);

    if (response.error) {
      console.log(response);
      this.errors.push(response.error);
      return {
        error: response.error,
        html: undefined,
        response: undefined,
        new: undefined,
        elements: undefined,
      };
    }

    let data = response.data;
    if (!data) {
      this.errors.push("Something went wrong");
      return {
        error: "Something went wrong",
        html: undefined,
        response: undefined,
        new: undefined,
        elements: undefined,
      };
    }

    let width = 0;
    let height = 0;

    let response_ratio = response.width / response.height;

    //console.log('Response ratio', response_ratio);

    if (body.fill === "width") {
      height = body.width / response_ratio;
      width = body.width;
    } else if (body.fill === "height") {
      width = body.height * response_ratio;
      height = body.height;
    } else {
      width = body.height * response_ratio;
      height = body.height / response_ratio;
    }

    let scaled = { width, height };

    let original = { width: response.width, height: response.height };
    let canvas = { ...original, fill: data.canvas.fill };

    const html = generateHTML(
      scaled,
      original,
      canvas,
      data.ad,
      this.props.borderRadius,
      true,
    ) as any;

    return {
      error: this.errors[0],
      html,
      response,
      elements: data.ad,
      new: { width, height },
      size_id: response.size_id,
      ad_id: response.ad_id,
    };
  }

  async query(body: Body) {
    const SERVER_URL = server_url({
      prod: "/ad",
      dev: "/fetch_ad/ad",
      is_dev: this.is_dev,
    });
    console.log("Querying ad...");

    const json_body = JSON.stringify(body);
    let headers: Record<string, string> = { "X-Api-Key": this.api_key ?? "" };

    this.is_dev &&
      (headers["X-Forwarded-For"] = "116.91.213.179, 3.172.16.106");

    let request = fetch(SERVER_URL, {
      method: "POST",
      headers,
      body: json_body,
    });

    const data: any = await scheduler.addRequest(
      () => request.then((res) => res.json()),
      this.priority,
    );
    console.log("data", data);

    return data;
  }

  async load() {
    if (this.in_viewport) {
      let { html, error } = await this.inject();

      return { new_element: html, error };
    }
    return { new_element: null, error: null };
  }

  async inject() {
    console.log("Loading ad...");
    let {
      error: err,
      html,
      response,
      new: dimensions,
      ad_id,
      elements,
      size_id,
    } = await this.fetch();

    if (err) {
      this.errors.push(err);
      console.log("errerrer", err);
      return { error: err };
    }

    console.log(response, err);

    if (err && err.includes("api key does not exist")) {
      this.errors.push(
        `API key does not exist. View your API keys at https://adjustv4.vercel.app/site/dashboard/keys`,
      );
      return {
        error: `API key does not exist. View your API keys at https://adjustv4.vercel.app/site/dashboard/keys`,
      };
    }

    let error = "";

    if (
      err &&
      err.includes(
        'duplicate key value violates unique constraint "uq_ad_unit"',
      )
    ) {
      this.errors.push(
        'duplicate key value violates unique constraint "uq_ad_unit"',
      );
      return { error: `Ad units do not have unique names: ${this.name}` };
    }

    let server_click = server_url({
      prod: "/click/click",
      dev: "/click/click/click/click",
      is_dev: this.is_dev,
    });
    if (err) {
      console.error("query error", err);
      error = err;
      this.errors.push(err);
    } else if (html) {
      html.href = this.is_dev
        ? ""
        : !error
          ? `${server_click}?id=${size_id}_${ad_id}_${response.ad_unit_id}`
          : "";

      this.element.appendChild(html);
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

  observe(callback: () => void, onerror: (err: string) => void) {
    const intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(async (entry) => {
        if (entry.isIntersecting) {
          if (!this.in_viewport) {
            console.log("GEr", this.element, this.priority);
            let { error } = await this.inject();

            if (error && onerror) {
              onerror(error);
            }
            callback();
            return false;
          }
        } else {
          console.log("Element is out of the viewport!", entry);
        }
      });
    });
    intersectionObserver.observe(this.element.parentElement!);
  }
}

export type Body = {
  tags: string[];
  category: string;
  region: string;
  language: string;
  gender: string;
  ratio: number;
  fill: string;
  width: number;
  height: number;
};

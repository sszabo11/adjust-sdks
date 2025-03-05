import { scheduler } from "./schedular.js";
import { server_url } from "./server.js";

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

export async function query_ad(
  body: Body,
  api_key: string | undefined,
  priority: number,
  is_dev: boolean,
) {
  const SERVER_URL = server_url({ prod: "/ad", dev: "/fetch_ad/ad", is_dev });
  console.log("Querying ad...");
  const json_body = JSON.stringify(body);
  let headers: Record<string, string> = { "X-Api-Key": api_key ?? "" };

  is_dev && (headers["X-Forwarded-For"] = "116.91.213.179, 3.172.16.106");

  let request = fetch(SERVER_URL, {
    method: "POST",
    headers,
    body: json_body,
  });

  const data = await scheduler.addRequest(
    () => request.then((res) => res.json()),
    priority,
  );
  console.log("data", data);

  return data;
}

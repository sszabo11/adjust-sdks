let dev_url = "http://127.0.0.1:9000/lambda-url";
let prod_url =
  "https://y731tx3an4.execute-api.ap-southeast-2.amazonaws.com/Prod";

export function server_url({
  prod,
  dev,
  is_dev,
}: {
  prod: string;
  dev: string;
  is_dev: boolean;
}) {
  const base_url = is_dev ? dev_url : prod_url;

  const endpoint = `${base_url}${!is_dev ? prod : dev}`;
  return endpoint;
}

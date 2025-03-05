export function check_env({
  env_var,
  dev,
  url,
}: {
  env_var: Record<string, string>;
  dev: boolean;
  url: string;
}) {
  let api_key = env_var.PUBLIC_ADJUST_KEY;

  console.log(api_key);

  if (dev && url.startsWith("localhost") && !api_key) {
    return {
      warning:
        "Development PUBLIC_ADJUST_KEY not set. Please use your development key",
    };
  }

  return { warning: null };
}

import { Context } from "oak";
import { fromFileUrl } from "https://deno.land/std@0.141.0/path/mod.ts";

// deno-lint-ignore require-await
export async function fn(ctx: Context) {
  let FILE_URL = new URL("g_.html", import.meta.url).href;
  FILE_URL = fromFileUrl(FILE_URL);
  const html = await Deno.readTextFile(FILE_URL);

  ctx.response.body = html;
  ctx.response.headers.append(
    "content-type",
    "text/html",
  );
}

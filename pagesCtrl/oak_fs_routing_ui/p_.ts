import { Context } from "oak";
import { fromFileUrl } from "https://deno.land/std@0.141.0/path/mod.ts";
import { OakFileSysRouting } from "../../cli/oakFileSysRouting.ts";

export async function fn(ctx: Context) {
  // markup1 is string that will replaced by another string as text code generated auto
  const markup1 = "//don't touch this line it will be used by the system generating file";
  let html = "";
  let FILE_URL = new URL("g_.html", import.meta.url).href;
  FILE_URL = fromFileUrl(FILE_URL);
  html = await Deno.readTextFile(FILE_URL);

  // recuper les donnees
  if (ctx.request.hasBody) {
    const bodyDataPromise = ctx.request.body({ type: "form" });
    const data = await bodyDataPromise.value;
    const pathWeTarget = data.get("path") || "";
    const filename = data.get("filename");
    const targetRoutes = data.get("targetRoutes") || "";
    const routesName = data.get("routesName") || "";
    const o = new OakFileSysRouting();
    if (filename) {
      // execute command
      const templateString = o.getFullMapping(
        filename,
        pathWeTarget,
        targetRoutes,
        routesName
      )
        
      if (true) {
        let codeText = "<code>content</code>"; 
        codeText = codeText.replace("content", "done");
        // read targetRoutes content
        const targetRoutes_path = Deno.cwd() + "/" + targetRoutes; 
        try {
          let ts_code_string = await Deno.readTextFile(targetRoutes_path); 
          ts_code_string = ts_code_string.replace(
            markup1,
            templateString 
          ); 
          await Deno.writeTextFile(targetRoutes_path, ts_code_string, {
            create: true,
          });
        } catch (error) {
          console.error(error);
        }
        html = html.replace(
          "<!-- <h4>status</h4> -->",
          "<h4>status:success</h4>",
        );
        html = html.replace("<!-- <div>feedback</div> -->", "task done");
      }
    } else {
      console.log("missing path or file name");

      html = html.replace("<!-- <h4>status</h4> -->", "<h4>status:failed</h4>");
      html = html.replace(
        "<!-- <div>feedback</div> -->",
        "<div>missing file name</div>",
      );
    }
  } else {
    console.log("request has no body");

    html = html.replace("<!-- <h4>status</h4> -->", "<h4>status:failed</h4>");
    html = html.replace(
      "<!-- <div>feedback</div> -->",
      "<div>no body in the request </div>",
    );
  }

  ctx.response.body = html;
  ctx.response.headers.append(
    "content-type",
    "text/html",
  );
}

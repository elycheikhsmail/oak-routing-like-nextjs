import * as path from "https://deno.land/std@0.115.1/path/mod.ts";
export class OakFileSysRouting {
  methodsLetters = ["g_", "p_", "d_", "put_"];
  getCtrPathname(p: string) {
    // example p = g_demo.ts
    // this method take file name as input and make necessary calcul
    // and return http method name (get,post ,,) and file name
    // without http method markup
    // p alias for path or filename
    let m = ""; // method
    if (p.startsWith("g_")) {
      m = "GET";
      p = p.replace("g_", "");
    }

    if (p.startsWith("p_")) {
      m = "POST";
      p = p.replace("p_", "");
    }

    if (p.startsWith("d_")) {
      m = "DELETE";
      p = p.replace("d_", "");
    }

    if (p.startsWith("put_")) {
      m = "PUT";
      p = p.replace("put_", "");
    }
    return {
      m,
      p,
    };
  }

  getMatchPath(pp: string) {
    // example pp = g_demo.ts
    // example mathPath = "/demo"
    // example mathPath = "/todo/:id"
    let isValideSyntaxe = true;
    let { m, p } = this.getCtrPathname(pp);
    let mathPath = "";
    if (!m) {
      console.error(" pathname must start  by ", "g_", "p_", "d_", "put_");
    }
    if (m) {
      let ext = "";
      if (p && p == ".ts") {
        ext = ".ts";
      } else {
        ext = path.extname(p);
      }
 
      if (ext == ".ts") {
        p = p.replace(".ts", "");
        // test if p contient [
        if (!p.includes("[")) {
          mathPath = p; 
        }
        if (p.includes("[")) {
          // verifier que les [ sont ferme
          const pSlashArray = p.split("[");
          const pSlashArray1 = pSlashArray.slice(1); 
          for (const item of pSlashArray1) {
            // count le ] dans item
            if (!item.includes("]", 1)) {
              isValideSyntaxe = false;
            }
          }
          mathPath = p.replaceAll("[", "/:").replaceAll("]", "/");
          if (mathPath.at(-1) == "/") {
            mathPath = mathPath.slice(0, -1);
          }
          //console.log({ mathPath })
        }
      }
      if (ext != ".ts") { 
        isValideSyntaxe = false;
      }
    }

    return {
      mathPath,
      p,
      m,
      isValideSyntaxe,
    };
  }

  getFullMapping(
    fileName: string,
    directoryPath: string,
    targetRoutes: string = "routes_public.ts",
    routesName: string = "routesPublic",
  ):string {
    const f = fileName;
    let link_template_string = ""
    let { mathPath, m, isValideSyntaxe } = this.getMatchPath(fileName);
    if (isValideSyntaxe) {
      mathPath = path.join(directoryPath, mathPath);
      m = m.toLowerCase();
      link_template_string = this.linkTemplate(
        f,
        m,
        mathPath,
        directoryPath,
        routesName,
      );
      try {
        const fPath = `${directoryPath}/${f}`;
        const ctr_template_string = this.ctrTemplate(`./pagesCtrl/${fPath}`);
        Deno.writeTextFileSync(`./pagesCtrl/${fPath}`, ctr_template_string);
      } catch (e) {
        console.log(e);
      }

      // save params in sqlitedb then regenarate /pagesCtr.ts
      // write this in server_routes/pagesCtr.ts
    } else {
      console.log("invalid syntax, can't create route");
    }
    return link_template_string
  }

  private linkTemplate(
    f: string,
    m: string,
    mathPath: string,
    directoryPath: string,
    routesName: string = "routes",
  ) { 
    let fPath = `${f}`;
    if (directoryPath) {
      fPath = `${directoryPath}/${f}`;
    }

    const tsfPath = fPath
      .replaceAll("/", "_s_")
      .replaceAll("[", "_lb_")
      .replaceAll("]", "_rb_")
      .replaceAll(".ts", "_ts");
    this.ctrTemplate("");

    return `
// deno-lint-ignore camelcase \n
import { fn as fn${tsfPath} } from "./pagesCtrl/${fPath}"; \n 
${routesName}.${m}("/${mathPath}", async (ctx: Context) => await fn${tsfPath}(ctx)); \n
//don't touch this line it will be used by the system generating file
        `;
  }
  private ctrTemplate(relativePath: string) {
    return `
import { Context } from "oak"; 
// deno-lint-ignore require-await
export async function fn(ctx: Context) { 
  ctx.response.body = "<h1>  ${relativePath} </h1>";
  ctx.response.headers.append(
    "content-type",
    "text/html",
  );
}
       `;
  }
}

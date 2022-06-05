import { Context, Router } from "oak";
const publicRoutes = new Router();
 

// deno-lint-ignore camelcase 

import { fn as fng_todo_ts } from "./pagesCtrl/g_todo.ts"; 
 
publicRoutes.get("/todo", async (ctx: Context) => await fng_todo_ts(ctx)); 

//don't touch this line it will be used by the system generating file
        
        
         

export { publicRoutes };

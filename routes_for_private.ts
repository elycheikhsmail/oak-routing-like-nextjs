import { Context, Router } from "oak";
const privateRoutes = new Router();

// deno-lint-ignore camelcase
import { fn as fnprivate_s_objects_s_objectname_s_p_add_ts } from "./pagesCtrl/private/objects/objectname/p_add.ts";
privateRoutes.post(
  "/private/objects/objectname/add",
  async (ctx: Context) =>
    await fnprivate_s_objects_s_objectname_s_p_add_ts(ctx),
);

//don't touch this line it will be used by the system generating file
export { privateRoutes };

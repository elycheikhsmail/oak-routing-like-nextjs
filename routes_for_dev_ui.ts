import { Context, Router } from "oak";
const devRoutes = new Router();

// deno-lint-ignore camelcase
import { fn as fnoak_fs_routing_ui_s_g__ts } from "./pagesCtrl/oak_fs_routing_ui/g_.ts";
devRoutes.get(
  "/oak_fs_routing_ui",
  async (ctx: Context) => await fnoak_fs_routing_ui_s_g__ts(ctx),
);

// deno-lint-ignore camelcase
import { fn as fnoak_fs_routing_ui_s_p__ts } from "./pagesCtrl/oak_fs_routing_ui/p_.ts";
devRoutes.post(
  "/oak_fs_routing_ui",
  async (ctx: Context) => await fnoak_fs_routing_ui_s_p__ts(ctx),
);

export { devRoutes };

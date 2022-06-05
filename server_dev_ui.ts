import { Application } from "oak";

const app = new Application();
import { portDev as port } from "./config.ts";

// public routes
import { devRoutes } from "./routes_for_dev_ui.ts";
app.use(devRoutes.routes());
app.use(devRoutes.allowedMethods());

// start server
console.log("start server");
const url = `http://localhost:${port}`;
console.log(url);
const url_ui = url + "/oak_fs_routing_ui";
console.log(url_ui);

await app.listen({ port });

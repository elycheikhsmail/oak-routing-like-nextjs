import { Application } from "oak";
const app = new Application();
import { port } from "./config.ts";

// public routes
import { publicRoutes } from "./routes_for_public.ts";
app.use(publicRoutes.routes());
app.use(publicRoutes.allowedMethods());

// private route
// import { privateRoutes } from "./routes_for_private.ts";
// app.use(privateRoutes.routes());
// app.use(privateRoutes.allowedMethods());

// admin routes
// import { adminRoutes } from "./routes_for_admin.ts";
// app.use(adminRoutes.routes());
// app.use(adminRoutes.allowedMethods());

// start server
console.log("start server");
const url = `http://localhost:${port}`;
console.log(url);
//
await app.listen({ port });

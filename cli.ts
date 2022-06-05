// deno run --allow-all cli.ts

// deno run --allow-all cli.ts  g_[id].ts todos server_dev.ts
// deno run --allow-all cli.ts g_.ts todos
// deno run --allow-all cli.ts g_.ts oak_fs_routing_ui
// deno run --allow-all cli.ts  g_test[id].ts child/todo
//  deno run --allow-all cli.ts p_.ts  oak_fs_routing_ui
import { OakFileSysRouting } from "./cli/oakFileSysRouting.ts";
let isMatch = false;
if (!isMatch && Deno.args.length == 4) {
  isMatch = true; 
  const o = new OakFileSysRouting();
  o.getFullMapping(
    Deno.args[0],
    Deno.args[1],
    Deno.args[2],
    Deno.args[3],
  );
}
if (!isMatch && Deno.args.length == 3) {
  isMatch = true; 
  const o = new OakFileSysRouting();
  o.getFullMapping(Deno.args[0], Deno.args[1], Deno.args[2]);
}
if (!isMatch && Deno.args.length == 2) {
  isMatch = true; 
  const o = new OakFileSysRouting();
  o.getFullMapping(Deno.args[0], Deno.args[1]);
}

if (!isMatch && Deno.args.length == 1) {
  isMatch = true; 
  const o = new OakFileSysRouting();
  o.getFullMapping(Deno.args[0], "./");
}

if (!isMatch) {
  console.log(" you need to write command with right pararams");
  console.log("only one command ");
  console.log(
    " deno run --allow-all cli.ts   {filename} {relative directory path} ",
  );
  console.log(" example : ");
  console.log("deno run --allow-all cli.ts g_.ts todos");
  console.log("todos directory must exist in pagesCtrl");
  console.log("start template will be in ... github");
  console.log(" deno run --allow-all cli.ts  g_[id].ts todos");
}

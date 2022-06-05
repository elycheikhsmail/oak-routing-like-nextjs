# oak-file-system routing project template

this is project templates based on oak where routing is generated based on
file-system routing for example we have the following mapping :

```
file          relative path                  route path                  http method
g_.ts         pagesCtrl/todos/g_.ts            todos/                       GET
g_[id].ts     pagesCtrl/todos/g_[id].ts        todos/:id/                   GET
p_.ts         pagesCtrl/todos/g_.ts            todos/                       POST
d_[id].ts     pagesCtrl/todos/d_[id].ts        todos/:id/                   DELETE
put_[id].ts   pagesCtrl/todos/put_[id].ts      todos/:id/                   PUT
```

project template structure :

```
.
├── a.ts
├── cli
│   └── oakFileSysRouting.ts
├── cli.ts
├── _cmd.txt
├── config.ts
├── deno.json
├── import_map.json
├── pagesCtrl
│   └── oak_fs_routing_ui
│       ├── g_.html
│       ├── g_.ts
│       └── p_.ts
├── README.md
├── routes_for_admin.ts
├── routes_for_dev_ui.ts
├── routes_for_private.ts
├── routes_for_public.ts
├── screens
├── server_dev_ui.ts
├── server.ts
└── todo.txt

```

for generate controller based on file system routing we have web interface for
this :
run 

```
deno task ui
```
(after dowling th e repo )
<image src="screens/1_run_deno_task_ui.png" />
then we have this web interface for creating controller
<image src="screens/2_oak_fs_routing_ui.png" />
then we fill the form
if controller name start with g_ that mean the http methode is get <br>
if controller name start with p_ that mean the http methode is post <br>
if controller name start with put_ that mean the http methode is put <br>
if controller name start with delete_ that mean the http methode is delete <br>
...
<image src="screens/3_g_ctr1.png" />
start dev server
<image src="screens/5_deno_task_start.png" />
controller with default contenent generated auto
<image src="screens/6_todo_url_ui.png" />
 


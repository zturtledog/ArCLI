## path

<!-- javascript side -->

infile
|
|- cllify  (cll.js)
|
|______- context (main.js)
|  |  |
|--|--|- parse  (./langs/*.js && main.js)
|  |  |
|--|-_/- stitch namespace && compile main call line  (namespace.js)
|  |
|--|- output  [not if -ng] (main.js)
|  |
|-_/- check use [branch] (use.js)
|
sendoff to cs

<!-- c sharp side -->

inder
|
|- verify workspace

## examle source directory (for a project called cstack)

\-src
  |-readme.md
  |-package.cll
  \-actial
    |-hwalld.amethyst
  \-workplace  (won't generate some if -ng)
    |-cdyi.json (required file)
    |-cllstack.json
    |-nmsp.json
    |-cllout.json
    \-namespaces
      |-global.nmsp
  \-out
    |-cstack.vios
    \-dlion  (contains a list of .bxc files)

## details

read through cll
for list
    parse file with metadata
    for all namespaces in resulting file
        add to a list of namespaces
    stitch all code and functions into a object that represents the module
    add module into a list of modules
stitch together all modules into one file
output if not -ng
create list of stiched namespaces
for all namespaces
    if in list
        add data to index
    else
        add as new index
for all modules (in new branch, can be ignored for the first run)
    check usage for all functions and 
    check namespace list
    mark used namespaces
    remove all unused functions
    clear any errors
remove unused namespaces

<scopeify && typeset> ???? (new branch)

output to file list for compilation

## outexample

```js

{
    namespaces: [
        {
            name: "global",
            content: []
        }
    ],
    private:{
        macro:[],
        functions:[]
    },
    code: []
}

```

## psudocode

```js
usecll()
for (list)
    parse(file) && metadata
    for (namespaces in result)
        list.add(namespaces)
    stitch(code && functions) -> module
    mlist.add(module)
stitch(modules) -> file
if (! -ng)
    output(file)
new list<namespaces>()
for (namespaces)
    if (in list)
        ils[i].add(data)
    else
        ils.add(new index)
for (modules) {in new branch()}
    check(usage, for(functions, -> i)) 
    check(namespaces)
    mark(namespaces ? used) 
    remove(functions ? unused)
    clear(errors)
remove(namespaces ? unused)
```
import * as cll from "./cll.js"
import {error} from "./shared.js"

//import languages

import * as amethyst from "./langs/amethyst.js"

//register languages

let langs = []
langs.push(amethyst.register())

//do other things

let quiet = false;

if (Deno.args[0] == "help") {
    console.log(
        [
            "\x1b[34mpatch: \x1b[0m\x1b[3m\x1b[33moutputs the workspace as a bxc file\x1b[0m",
            "\x1b[34mhelp: \x1b[0m\x1b[3m\x1b[33mprints this page\x1b[0m\n",
            "-------------------------------------------------------------------------------------------------------------\n",
            "\x1b[34m-q: \x1b[0m\x1b[3m\x1b[33msilences the status messages\x1b[0m",
            "\x1b[34m-o: \x1b[0m\x1b[3m\x1b[33mdefines the output directory\x1b[0m",
            "\x1b[34m-w: \x1b[0m\x1b[3m\x1b[33mdefines the working directory\x1b[0m",
            "\x1b[34m-ng: \x1b[0m\x1b[3m\x1b[33mstops the prosses from creating lots of internal files in the working directory\x1b[0m\n",
            "-------------------------------------------------------------------------------------------------------------\n",
        ].join("\n")+"\x1b[0m"
    )

    Deno.exit()
}

if (Deno.args[0] != "patch") {
    error("Invalid action","'"+Deno.args[0]+"' is not a valid action, run 'help' for assistence.");
    Deno.exit()
}

if (argsget("-q",true)) {
    quiet = true
}

//prosses cll

let cllout = cll.usecll(Deno.args[1],argsget("-w") ? argsget("-w")+"cllout.json" : false)

function argsget(f,rt) {
    for (let i = 2; i < Deno.args.length; i++) {
        if (Deno.args[i] == f) {
            if (rt) {return true}
            return Deno.args[i+1];
        }
    }
    return false
}

//run

let callorder = []
for (let i = 0; i < cllout.callorder.length; i++) {
    let found = false;
    for (let j = 0; j < langs.length; j++) {
        for (let k = 0; k < langs[j].alias.length; k++) {
            if (cllout.callorder[i].type == langs[j].alias[k]) {
                if (!quiet) {
                    console.log("\x1b[1m\x1b[33mAssosiating files \x1b[30m: \x1b[35m"+cllout.callorder[i].fdir+"\x1b[0m")
                }
                found = j;
                break
            }
        }
        if (typeof found != "boolean") break
    }
    if (typeof found != "boolean") {
        callorder.push({
            data: cllout.callorder[i].data,
            name: cllout.callorder[i].name,
            ast: langs[found].toast(cllout.callorder[i].data) || [],
            path: cllout.callorder[i].fdir,
            id: found,
        })
    }else{
        error("Invalid File Type","The file type of '"+cllout.callorder[i].type+"' is not in the registry, please make sure that you are using valid file names.\nthis file will be ignored, this can cause null references and api failures.\n")
    }
}
cllout.callorder = callorder
console.log(cllout)
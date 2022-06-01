import {usecll} from "./cll.js"
import {error, mkdir} from "./libs/shared.js"

//import languages

import * as amethyst from "./langs/amethyst.js"

//flags

let quiet = argsget("-q",true);
let makegarbage = !argsget("-ng",true);

if (Deno.args[0] == "help") {
    console.log([
        "\x1b[1m\x1b[30mformat: \x1b[31m<cll>... [flags]",
        "\x1b[1m\x1b[32m-------------------------------------------------------------------------------------------------------------\n",
        "\x1b[1m\x1b[34mhelp: \x1b[0m\x1b[3m\x1b[33mprints this message\x1b[0m",
        "\x1b[1m\x1b[34mnew: \x1b[0m\x1b[3m\x1b[33mcreates a fresh progect in the working directory\x1b[0m",
        "\x1b[1m\x1b[32m-------------------------------------------------------------------------------------------------------------\n",
        "\x1b[1m\x1b[35m-ng: \x1b[0m\x1b[3m\x1b[36mstops the packager from creating garbage internal files in the workspace\x1b[0m",
        "\x1b[1m\x1b[35m-w: \x1b[0m\x1b[3m\x1b[36mdefines the workspace directory\x1b[0m",
        "\x1b[1m\x1b[35m-q: \x1b[0m\x1b[3m\x1b[36msilences the packager from the console\x1b[0m",
        "\x1b[1m\x1b[35m-o: \x1b[0m\x1b[3m\x1b[36mdefines the output directory\x1b[0m\n",
    ].join("\n")+"\x1b[0m")
    Deno.exit()
} 

if (Deno.args[0] == "new") {
    try {
        Deno.writeTextFileSync("./readme.md", "");
        Deno.writeTextFileSync("./settings.json", "");
        Deno.writeTextFileSync("./package.cll", "package ./actial/main.ion\n");
        Deno.mkdirSync("./actial");
        Deno.writeTextFileSync("./actial/main.ion", "sys: print 'Hello, World!'");
        Deno.mkdirSync(argsget("-w") || "./workspace");
        Deno.mkdirSync(argsget("-o") || "./output");
        console.log("\x1b[32mSucsess\x1b[0m")
    } catch(e) {
        error("Internal Filesystem Error",e.toString())
    }
    Deno.exit()
}

//register languages

let langs = {
    ext:{},
    regis:[]
}

rlang(amethyst.register())

//cll

let cllout = usecll(Deno.args[0],quiet?false:argsget("-w")||"./workplace/cllout.json")

console.log(cllout)

//helpers

function argsget(f,rt) {
    for (let i = 2; i < Deno.args.length; i++) {
        if (Deno.args[i] == f) {
            if (rt) {return true}
            return Deno.args[i+1];
        }
    }
    return false
}

function rlang(obj) {
    try {
        for (let i = 0; i < obj.alias.length; i++) {
            langs.ext[obj.alias[i]] = langs.regis.length
        }
        langs.regis.push({name:obj.name,toast:obj.toast})
    }catch (e) {
        error("Registration Error",e.toString())
    }
}








// if (argsget("-w",true)) {
//     try {
//         Deno.mkdirSync(argsget("-w")+"namespaces");
//     } catch(e) {
//         if (!((e+"").split(":")[0] == "AlreadyExists")) {
//             error("Internal Error",e.toString())
//         }
//     }
// }

// //prosses cll

// let cllout = cll.usecll(Deno.args[1],(argsget("-w") && makegarbage) ? argsget("-w")+"cllout.json" : false)

// function argsget(f,rt) {
//     for (let i = 2; i < Deno.args.length; i++) {
//         if (Deno.args[i] == f) {
//             if (rt) {return true}
//             return Deno.args[i+1];
//         }
//     }
//     return false
// }

// //run

// let callorder = []
// for (let i = 0; i < cllout.callorder.length; i++) {
//     let found = false;
//     for (let j = 0; j < langs.length; j++) {
//         for (let k = 0; k < langs[j].alias.length; k++) {
//             if (cllout.callorder[i].type == langs[j].alias[k]) {
//                 if (!quiet) {
//                     console.log("\x1b[1m\x1b[33mAssosiating files \x1b[30m: \x1b[35m"+cllout.callorder[i].fdir+"\x1b[0m")
//                 }
//                 found = j;
//                 break
//             }
//         }
//         if (typeof found != "boolean") break
//     }
//     if (typeof found != "boolean") {
//         callorder.push({
//             data: cllout.callorder[i].data,
//             name: cllout.callorder[i].name,
//             ast: langs[found].toast(cllout.callorder[i].data) || [],
//             path: cllout.callorder[i].fdir,
//             id: found,
//         })
//     }else{
//         error("Invalid File Type","The file type of '"+cllout.callorder[i].type+"' is not in the registry, please make sure that you are using valid file names.\nthis file will be ignored, this can cause null references and api failures.\n")
//     }
// }
// cllout.callorder = callorder

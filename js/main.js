import * as cll from "./cll.js"

//import languages

import {register_amethyst} from "./langs/amethyst.js"

//register languages

let langs = []
langs.push(register_amethyst())

//prosses cll

let cllout = cll.usecll(Deno.args[0],argsget("-w") ? argsget("-w")+"cllout.json" : false)

function argsget(f) {
    for (let i = 1; i < Deno.args.length; i++) {
        if (Deno.args[i] == f) {
            return Deno.args[i+1];
        }
    }
    return false
}

//
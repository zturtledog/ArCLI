import { error } from "./libs/shared.js";

export function stitch(key,set) {
    let nsps = {}
    let mojlist = []
    key.forEach(entry => {
        entry.prse.namespaces.forEach(nmsp => {
            if(nmsp.content.length > 0) {
                if (nsps[nmsp.name]) {
                    nmsp.content.forEach(vrk=>{
                        nsps[nmsp.name].push(vrk)
                    })
                }else{
                    nsps[nmsp.name] = nmsp.content
                }
            }
        })
        mojlist.push({
            location: entry.fdir,
            locluse: entry.prse.private,
            actial: entry.prse.code,
            iname: entry.name
        })
    });
    if (set.mg) {
        try {
            for(let i in nsps) {
                Deno.writeTextFileSync(set.dw+"namespaces/"+i+".nmsp",nsps[i])
                if (!set.dq) 
                console.log("\x1b[1m\x1b[31mRegistering Namespace\x1b[30m :: \x1b[35m"+i+"\x1b[0m");
            }
            Deno.writeTextFileSync(set.dw+"cllstack.json",JSON.stringify(mojlist))}
        catch (e) {
            error("Internal File Error (could be a faulty path)",e.toString())
        }
    }else {
        if (!set.dq) 
        for(let i in nsps) {
            console.log("\x1b[1m\x1b[31mRegistering Namespace\x1b[30m :: \x1b[35m"+i+"\x1b[0m");
        }
    }
    return {namespaces: nsps, calist: mojlist}
}
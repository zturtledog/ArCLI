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
        for(let i in nsps) {
            Deno.writeTextFileSync(set.dw+"namespaces/"+i+".nmsp",nsps[i])
        }
        Deno.writeTextFileSync(set.dw+"cllstack.json",JSON.stringify(mojlist))
    }
    console.log(nsps,mojlist)
}
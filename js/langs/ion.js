export function register() {
    return {
        name: "ion",
        alias: [
            "ion"
        ],
        toast: (data)=>{
            return {
                namespaces: [{
                    name: "global",
                    content: []
                }],
                private:{functions:[]},
                code: [
                    {
                        type:"macro",
                        actial:data
                    }
                ]
            }
        }
    }
}

/**
 * 
}

 */
export function register() {
    return {
        name: "amethyst",
        alias: [
            "amy",
            "amyth",
            "amethyst"
        ],
        toast: parse
    }
}

function parse() {
    return {
        namespaces: [
            {
                name: "global",
                content: []
            }
        ],
        private: {
            macro: [
                {}
            ],
            functions: []
        },
        code: [
            {
                type: "call",
                pool: "user",
                name: "fnc",
                parm: []
            },
        ]
    }
}

/**
 *  {
            namespace:"global",
            actial:[
                {
                    type:"call",
                    pool:"user",
                    name:"fnc",
                    parm:[]
                },
                {
                    type:"function-define",
                    stat:"private",
                    doct:"",
                    name:"fnc",
                    pram:[],
                    rslt:"void",
                    actial:[
                        {
                            type:"ffrloop",
                            iter:24,
                            varl:"i",
                            actial:[
                                {
                                    type:"macro",
                                    name:"log",
                                    mesh:[
                                        {
                                            type:"string",
                                            name:"Hello, World!"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
 */
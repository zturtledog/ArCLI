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
            },
            {
                name: "global",
                content: [""]
            }
        ],
        private: {
            macro: [
                {
                    name:"log",
                    parm:[
                        {
                            type:"str",
                            name:"%val"
                        }
                    ],
                    info:"sys: print %val"
                }
            ],
            functions: [
                {
                    name:"fnc",
                    rtrn:"void",
                    parm:[],
                    info:[
                        {
                            type:"loop",
                            time:24,
                            iter:"i",
                            info:[
                                {
                                    type:"macro",
                                    name:"log",
                                    parm:[
                                        {
                                            type:"string",
                                            valu:"Hello, World!"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
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
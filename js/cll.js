import {
    error
} from "./libs/shared.js";

export function usecll(file, outfile) {
    let data
    try {
        data = Deno.readTextFileSync(file).split("\r\n");
    } catch (flerror) {
        error("cll \x1b[0m\x1b[30m'" + file + "'\x1b[1m\x1b[31m failed to read", flerror.toString())
        Deno.exit()
    }

    let out = {
        plugins: [],
        library: [],
        callorder: [],
    };

    for (let i = 0; i < data.length; i++) {
        let back = data[i].replace(" ", "\u200b").split("\u200b");

        if (back.length > 1 && back[0] != "comment") {
            if (back[0] == "package") {
                try {
                    out.callorder.push({
                        name: back[1].split("\\")[back[1].split("\\").length - 1].split(".")[1].split("/").reverse()[0],
                        type: back[1].split("\\")[back[1].split("\\").length - 1].split(".").reverse()[0], //"examples\\helloworld.pinecone".split("\\")["examples\\helloworld.pinecone".split("\\").length-1].split(".")
                        fdir: back[1],
                        data: Deno.readTextFileSync(back[1].trim()),
                    });
                } catch (flerror) {
                    error(
                        "\x1b[31mpackage \x1b[30m'" + back[1] + "' \x1b[31mfailed to load properly",
                        flerror.toString()
                    )
                }
            } else if (back[0] == "using") {
                try {
                    let library = JSON.parse(Deno.readTextFileSync(back[1].trim()));
                    for (let j = 0; j < library.length; j++) {
                        out.library.push(library[j]);
                    }
                } catch (flerror) {
                    error(
                        "\x1b[31mlibrary \x1b[30m'" + back[1] + "' \x1b[31mfailed to load properly",
                        flerror.toString()
                    )
                }
            } else if (back[0] == "plugin") {
                try {
                    out.plugins.push(JSON.parse(Deno.readTextFileSync(back[1].trim())));
                } catch (flerror) {
                    error(
                        "\x1b[31mplugin \x1b[30m'" + back[1] + "' \x1b[31mfailed to load properly",
                        flerror.toString()
                    )
                }
            }
        }
    }

    if (outfile) {
        try {
            Deno.writeTextFileSync(outfile, JSON.stringify(out));
        } catch (flerror) {
            error(
                "Cll could not output itself to: \x1b[30m'" + outfile + "'\x1b[31m",
                flerror.toString()
            )
        }
        return out;
    } else {
        return out;
    }
}
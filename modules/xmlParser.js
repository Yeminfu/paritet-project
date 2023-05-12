import { XMLParser } from "fast-xml-parser";

const options = {
    ignoreAttributes: false
}
const parser = new XMLParser(options)

export function getParsed(xml) {
    let urls = parser.parse(xml).urlset.url

    let result = urls.map((e) => {
        return e.loc
    })

    return result
}

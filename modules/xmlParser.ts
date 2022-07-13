const { XMLParser } = require("fast-xml-parser");
const options = {
    ignoreAttributes: false
}
const parser = new XMLParser(options)

function getParsed(xml){
    let urls = parser.parse(xml).urlset.url

    let result = urls.map((e) => {
        return e.loc
    })

    return result
}

module.exports.getParsed = getParsed;
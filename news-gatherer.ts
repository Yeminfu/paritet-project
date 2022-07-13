const puppeteer = require('puppeteer');
const {getParsed} = require('./modules/xmlParser.ts');

const url = 'https://www.dvnovosti.ru/sitemap_news.xml';

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    var response = await page.goto(url, { waitUntil: 'networkidle2' })
    var pageXML = await response.text()

    let links = getParsed(pageXML)

    const firstPage = await getArticleByLink(links[0])

    console.log("PAGE_DATA:", firstPage)
    await browser.close();
})();

async function getArticleByLink(link){
    console.log(link)
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(link, { waitUntil: 'networkidle2' })

    const pageContent = await page.evaluate(() => {
        let title = document.querySelector('.story__title').innerHTML
        let lead = document.querySelector('.story__lead').innerHTML
        let blocks = document.querySelector('.story__blocks_border').innerHTML

        return {
            title: title,
            lead: lead,
            blocks: blocks,
        }
    })

    return pageContent
}

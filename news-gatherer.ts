const puppeteer = require('puppeteer');
const {getParsed} = require('./modules/xmlParser.ts');

const url = 'https://www.dvnovosti.ru/sitemap_news.xml';

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    var response = await page.goto(url, { waitUntil: 'networkidle2' })
    var pageXML = await response.text()

    let links = getParsed(pageXML)

    await browser.close();
})();

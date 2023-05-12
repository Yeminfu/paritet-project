import puppeteer from 'puppeteer';
import { connection } from "./modules/mysql/mysql.js";
import { getParsed } from './modules/xmlParser.js';


(async () => {

  connection.connect(async (err) => {
    if (err) {
      console.log("ERROR:", err)
      return err
    }
    else {
      console.log("DB CONNECTED!")
    }
  });

  const browser = await puppeteer.launch({
    headless: true, // используем новый режим без головы
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // дополнительные параметры запуска браузера
  });
  const page = await browser.newPage();

  const url = 'https://www.dvnovosti.ru/sitemap_news.xml';

  let response = await page.goto(url, { waitUntil: 'networkidle2' })
  let pageXML = await response.text()

  let links = getParsed(pageXML);

  links.forEach(link => {
    console.log('link', link);
  });


  await browser.close();

})();

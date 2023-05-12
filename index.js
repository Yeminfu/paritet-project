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
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  const url = 'https://www.dvnovosti.ru/sitemap_news.xml';

  let response = await page.goto(url, { waitUntil: 'networkidle2' })
  let pageXML = await response.text()

  let links = getParsed(pageXML);

  for (let index = 0; index < links.length; index++) {
    const link = links[index];
    if (index === 0) {
      console.log('link', link);
      await page.goto(link, { waitUntil: 'networkidle2' })
      let a = await page.evaluate(() => {
        console.log('manamana');
        return JSON.stringify(
          {
            title: document.querySelector('h1.story__title').innerText,
            undertitle: document.querySelector('p.story__lead').innerText,
            image: ['image', document.querySelector('.story__blocks>figure img').src],
            content: ['content',
              Array.from(document.querySelector('.content.story__block.story__block_text').children)
                .map(x => {
                  if (x.tagName === "P" || x.tagName === "BLOCKQUOTE") return {
                    tagName: x.tagName,
                    // innerText: x.innerText,
                  }
                  if (x.tagName === "FIGURE") return {
                    tagName: x.tagName,
                    innerHTML: x.innerHTML,
                  }
                  return x.tagName;
                })
            ],
          },
          null,
          2
        );
      });

      for (let index = 0; index < a.length; index++) {
        const element = a[index];

      }

      console.log('a', a);
    }
  }

  await browser.close();

})();

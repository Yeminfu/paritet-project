const puppeteer = require('puppeteer')
const {getParsed} = require('./modules/xmlParser.ts')
const mysql = require('mysql2')
const slugger = require('slugify')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    socketPath: '/var/run/mysqld/mysqld.sock',
    user: 'root',
    password: 'root',
    database: 'testdb'
})

connection.connect(async (err) => {
    if(err){
        console.log("ERROR:", err)
        return err
    }
    else{
        console.log("DB CONNECTED!")
        await getAllNews()
        closeDB()
    }
})

function closeDB(){
    connection.end(err => {
        if(err){
            console.log("ERROR:", err)
            return err
        }
        else{
            console.log("DB CLOSED!")
        }
    })
}

async function checkIsNewsExists(link){
    console.log("CHECKING")
    const query = `select exists(select id from News where link = "${link}")`
    let result = false
    await connection.promise().query(query)
        .then(function (res){
            result = Object.values(res[0][0])[0] === 1
        })
        .catch(err => {console.log(`ERROR: ${err}`); result = false})
    console.log("CHECKED")
    return result
}

async function insertNews(news){
    console.log("INSERTING")
    let query = `
    INSERT INTO News(
        title,
        slug,
        description, 
        smallImg, 
        dateTime, 
        blocks,
        link
    )
    VALUES(
        '${news.title}', 
        '${news.slug}', 
        '${news.description}', 
        '${news.smallImg}', 
        '${news.dateTime}', 
        '${news.blocks}',
        '${news.link}'
    )`;

    await connection.promise().query(query)
        .then(function (result){
            return result
        })
        .catch(err => console.log(`ERROR: ${err}`))
}

const url = 'https://www.dvnovosti.ru/sitemap_news.xml';

//(async () => {
//    const browser = await puppeteer.launch();
//    const page = await browser.newPage();
//
//    var response = await page.goto(url, { waitUntil: 'networkidle2' })
//    var pageXML = await response.text();
//
//    console.log('pageXML', pageXML);
//
//    await browser.close();
//})();

async function getNewsLinks(){
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let response = await page.goto(url, { waitUntil: 'networkidle2' })
    let pageXML = await response.text()

    let links = getParsed(pageXML)

    const firstPage = await getArticleByLink(links[0])

    console.log("PAGE_DATA:", firstPage)
    await browser.close();
}

async function getArticleByLink(link){
    const browser = await puppeteer.launch({args: ['--no-sandbox'], executablePath: '/usr/bin/chromium-browser'})
    const page = await browser.newPage()
    console.log("LINK", link)
    await page.goto(link, {})
    console.log("TAKING ARTICLE")
    let pageContent = await page.evaluate(() => {
        const title = document.querySelector('.story__title')?.innerHTML
        const description = document.querySelector('.story__lead')?.innerHTML
        document.querySelectorAll('a').forEach(e => e.removeAttribute('href'))
        const blocks = document.querySelector('.story__blocks_border')?.innerHTML
        const smallImg = document.querySelector('.story__image_small')?.getAttribute('src') || document.querySelector('.story__image')?.getAttribute('src')
        let dateTime = document.querySelector('.story__time')?.getAttribute('datetime')
        let src = dateTime
        const newDT = new Date(dateTime)
        dateTime = newDT.getFullYear()+'-'
            +('0'+(newDT.getMonth()+1)).slice(-2)+'-'
            +('0'+newDT.getDate()).slice(-2)+' '
            +('0'+newDT.getHours()).slice(-2)+':'
            +('0'+newDT.getMinutes()).slice(-2)+':'
            +('0'+newDT.getSeconds()).slice(-2)


        return{
            title: title?.trim(),
            slug: title?.trim(),
            description: description?.trim(),
            blocks: blocks,
            smallImg: smallImg,
            dateTime: dateTime,
            link: '',
            src: src
        }
    })

    console.log("TOOK")
    await browser.close()

    return pageContent
}

async function getAllNews(){

    const browser = await puppeteer.launch({args: ['--no-sandbox'], executablePath: '/usr/bin/chromium-browser'})
    const page = await browser.newPage()
    let response = await page.goto(url, { waitUntil: 'networkidle2' })
    let pageXML = await response.text()

    let links = getParsed(pageXML)

    async function getData(){
        for(let i = 0; i < links.length; i++){
            console.log(`PROCESSING NEWS ${i+1}/${links.length}`)
            const isExists = await checkIsNewsExists(links[i])
            if(isExists === true){
                console.log("NEWS EXISTS")
            }
            else if(isExists === false){
                console.log("NEWS DOESN'T EXIST")
                let data = await getArticleByLink(links[i])
                if(data.slug !== undefined){
                    data.slug = slugger(data.slug, '_').toLowerCase().replaceAll('"' || '»' || '«' || '\'', '')
                }
                data.link = links[i]
                await insertNews(data)
            }
        }
        console.log("PROCESSING DONE!")
        const deletingQuery = 'DELETE FROM News WHERE dateTime < NOW() - INTERVAL 5 DAY'
        await connection.promise().query(deletingQuery)
            .then(function (res){
                console.log(`RESULT: ${res}`)
            })
            .catch(err => console.log(`ERROR: ${err}`))
        closeDB()
        //return news
    }
    await browser.close();

    await getData()

}
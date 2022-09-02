const path = require("path");

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const mysql = require('mysql2')

const connection = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    socketPath: '/var/run/mysqld/mysqld.sock',
    user: 'root',
    password: 'root',
    database: 'testdb',
    connectionLimit: 10,
    acquireTimeout: 30000,
    waitForConnections: true,
})


//connection.connect(err => {
//    if(err){
//        console.log("ERROR:", err)
//        return err
//    }
//    else{
//        console.log("DB CONNECTED!")
//    }
//})

const PORT = 3002

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.listen(PORT, () => {
    console.log(`OPENED PORT: ${PORT}`)
    console.log("SERVER LISTENING...")
})

let response = null


//REGISTRATION/AUTHORIZATION
server.post('/api/getRegistration', async (req, res) => {
    console.log("BACK GOT REG REQUEST", req)
    let data = Object.keys(req.body)
    await getRegistration(JSON.parse(data[0]).username.toString(), JSON.parse(data[0]).password.toString())
    res.send(response)
    response = null
})
async function getRegistration(username, password){
    response = {}
    console.log("SENDED", username, password)
    const query = `SELECT id FROM Users WHERE username = "${username}"`
    const result = await connection.promise().query(query)
    const isUserExists = result[0].length === 0 ? false : true
    if(!isUserExists){
        const newToken = createToken()
        const currentDTInMsecsPlus5Min = new Date().getTime()+5*60000
        console.log("PRE1", currentDTInMsecsPlus5Min)
        const newDT = new Date(currentDTInMsecsPlus5Min)
        console.log("PRE2", newDT)
        const tokenExpDate = newDT.getFullYear()+'-'
            +('0'+(newDT.getMonth()+1)).slice(-2)+'-'
            +('0'+newDT.getDate()).slice(-2)+' '
            +('0'+newDT.getHours()).slice(-2)+':'
            +('0'+newDT.getMinutes()).slice(-2)+':'
            +('0'+newDT.getSeconds()).slice(-2)
        console.log("PRE3", tokenExpDate)
        const fullUserDataQuery = `INSERT INTO Users(username, password, token, tokenUpdate) VALUES ("${username}","${password}","${newToken}","${tokenExpDate}")`
        const fullUserData = await connection.promise().query(fullUserDataQuery)
        const checkQuery = `SELECT * FROM Users WHERE username = "${username}"`
        const addedResult = await connection.promise().query(checkQuery)
        const isSuccessfully = addedResult[0].length === 1 ? true : false
        if(isSuccessfully){
            response = addedResult[0]
        }
        else{
            response = 'FAILED'
        }
    }
    else{
        response = 'TAKEN'
    }
}
server.post('/api/getAuth', async (req, res) => {
    //console.log("BACK GOT REQUEST", req)
    let data = Object.keys(req.body)
    await getAuth(JSON.parse(data[0]).username.toString(), JSON.parse(data[0]).password.toString())
    res.send(response)
    if(response !== null) response = null
})
async function getAuth(username, password){
    response = {}
    console.log("SENDED", username, password)
    const query = `SELECT id FROM Users WHERE username = "${username}" AND password = "${password}"`
    let data = await connection.promise().query(query)
    console.log("DATA", data[0])
    if(data[0].length > 0){
        console.log("DATA.LNG > 0")
        const newToken = createToken()
        const currentDTInMsecsPlus5Min = new Date().getTime()+60*60000
        console.log("PRE1", currentDTInMsecsPlus5Min)
        const newDT = new Date(currentDTInMsecsPlus5Min)
        console.log("PRE2", newDT)
        const tokenExpDate = newDT.getFullYear()+'-'
            +('0'+(newDT.getMonth()+1)).slice(-2)+'-'
            +('0'+newDT.getDate()).slice(-2)+' '
            +('0'+newDT.getHours()).slice(-2)+':'
            +('0'+newDT.getMinutes()).slice(-2)+':'
            +('0'+newDT.getSeconds()).slice(-2)
        console.log("PRE3", tokenExpDate)
        const setTokenQuery = `UPDATE Users SET token = "${newToken}", tokenUpdate = "${tokenExpDate}" WHERE username = "${username}" AND password = "${password}"`
        await connection.promise().query(setTokenQuery)
        const fullUserDataQuery = `SELECT id, username, token, tokenUpdate FROM Users WHERE username = "${username}" AND password = "${password}"`
        const fullUserData = await connection.promise().query(fullUserDataQuery)
        response = fullUserData[0]
    }
    else{
        response = 'INCORRECT'
    }
}

//NEWS
server.post('/api/getLastNews', async (req, res) => {
    const query = 'select * from News order by dateTime desc limit 5'
    let data = await connection.promise().query(query)
    response = JSON.stringify(data)
    res.send(response)
    console.log("SERVER: LAST NEWS OBTAINED", data)
    response = null
})
server.post('/api/getNews', async (req, res) => {
    console.log("SERVER:", 'getNews()')
    let data = Object.keys(req.body)
    await getNews(Number(JSON.parse(data[0]).quantity))
    res.send(response)
    response = null
})
async function getNews(quantity){
    if(quantity === 0){
        const query = 'SELECT * FROM News ORDER BY dateTime DESC'
        let data = await connection.promise().query(query)
        response = JSON.stringify(data[0])
        console.log("SERVER: NEWS OBTAINED")
    }
    //else if(quantity > 0){
    //    response = JSON.stringify([...news.slice(quantity*-1)])
    //}
}
server.post('/api/getNewsDetails', async (req, res) => {
    console.log("SERVER:", 'getNewsDetails()')
    console.log(">>>>> req.body", req.body)
    let data = Object.keys(req.body)
    console.log("BY SLUG", JSON.parse(data[0]))
    const parsed = JSON.parse(data[0])
    const slug = parsed.slug

    const query = `SELECT * FROM News WHERE slug="${slug}"`

    response = await connection.promise().query(query).catch(e => response = e)
    res.send(response[0])
    response = null
})
server.post('/api/checkNewsExist', async (req, res) => {
    let data = Object.keys(req.body)
    const parsed = JSON.parse(data[0])
    const link = parsed.link
    const query = `SELECT EXISTS(SELECT id FROM News WHERE link = "${link}")`
    response = await connection.promise().query(query).catch(e => response = e)
    console.log("ANSWER", response[0])
    //res.send(response[0])
    //response = null
})


//FORUM CATEGORIES
server.post('/api/setNewForumCategory', async (req, res) => {
    console.log("SERVER: setNewForumCategory()")
    let data = Object.keys(req.body)
    await setNewForumCategory(data)
    res.send(response)
    response = null
})
async function setNewForumCategory(data){
    //console.log("DATA", data)
    const requestData = JSON.parse(data)
    console.log("DATA", requestData)
    const query = `INSERT INTO ForumCategories(title, slug, parent, description, has_children) 
    VALUES("${requestData.title}","${requestData.slug}", ${requestData.parent},"${requestData.description}","${requestData.hasChildren}")`
    let result = 'SUCCESSFUL'
    await connection.promise().query(query).catch(e => {result = e})
    response = result
    console.log("SERVER: NEW FORUM CATEGORY CREATED")
}
server.post('/api/getForumCategories', async (req, res) => {
    console.log("SERVER: getForumCategories()")
    const query = 'SELECT * FROM ForumCategories WHERE parent IS NULL'
    const data = await connection.promise().query(query)
    response = JSON.stringify(data[0])
    res.send(response)
    console.log("SERVER: FORUM CATEGORIES OBTAINED", data)
})
server.post('/api/getForumCategoriesByParentId', async (req, res) => {
    console.log("SERVER: getForumCategoriesByParentId()")
    let data = Object.keys(req.body)
    await getForumCategoriesByParentId(data)
    res.send(response)
    response = null
})
async function getForumCategoriesByParentId(data){
    console.log("DATA", data)
    const requestData = JSON.parse(data)
    //console.log("DATA", requestData)
    const query = requestData.id !== null
        ? `SELECT * FROM ForumCategories WHERE parent=${requestData.id}`
        : 'SELECT * FROM ForumCategories WHERE parent IS NULL'
    //let result = 'SUCCESSFUL'
    let result = await connection.promise().query(query)
    response = JSON.stringify(result[0])
    console.log("SERVER: GOT FORUM CATEGORY BY ID")
}
server.post('/api/getCategoryParent', async (req, res) => {
    console.log("SERVER: getCategoryParent()")
    let data = Object.keys(req.body)
    await getCategoryParent(data)
    res.send(response)
    response = null
})
async function getCategoryParent(data){
    const requestData = JSON.parse(data)
    console.log("SERVER: getCategoryParent("+requestData.id+")")
    const query = `SELECT * FROM ForumCategories WHERE id=${requestData.id}`
    let result = await connection.promise().query(query)
    response = JSON.stringify(result[0])
}
server.post('/api/editForumCategory', async (req, res) => {
    console.log("SERVER: editForumCategory()")
    const data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    const query = `UPDATE ForumCategories SET 
                        title = "${requestData.title}", 
                        slug = "${requestData.slug}", 
                        parent = ${requestData.parent}, 
                        description = "${requestData.description}", 
                        has_children = ${requestData.hasChildren} where id = ${requestData.id}`
    response = 'SUCCESSFUL'
    await connection.promise().query(query).then(() => {console.log('then ->', data)}).catch(e => {response = e})
    res.send(response)
    response = null
})
server.post('/api/deleteForumCategory', async (req, res) => {
    const data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    console.log("SERVER: deleteForumCategory()", requestData.id)
    const query = `DELETE FROM ForumCategories WHERE id = ${requestData.id}`
    response = 'SUCCESSFUL'
    await connection.promise().query(query).then(() => {console.log('then ->', data)}).catch(e => {response = e})
    res.send(response)
    response = null
})


//FORUM TOPICS
server.post('/api/setNewForumTopic', async (req, res) => {
    const data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    //console.log("SERVER: setNewForumTopic()", requestData)
    let result = 'SUCCESSFUL'
    const insertTopicQuery = `insert into ForumTopics(title, slug, userId, categorySlug, createdAt, lastUsername, lastCreatedAt) 
        values("${quotesPatcher(requestData.title)}", 
        "${quotesPatcher(requestData.slug)}", 
        ${requestData.userId}, 
        "${quotesPatcher(requestData.categorySlug)}", 
        "${requestData.date}", "${requestData.username}", "${requestData.date}")`
    await connection.promise().query(insertTopicQuery).catch(e => {result = e})
    console.log("result", result)
    if(result === "SUCCESSFUL"){
        console.log("msg", requestData.message)
        console.log("date", requestData.date)
        console.log("userId", requestData.userId)
        console.log("slug", requestData.slug)
        const addMessageQuery = `insert into ForumMessages(message, createdAt, userId, topicSlug)
        values("${quotesPatcher(requestData.message)}", "${requestData.date}", ${requestData.userId}, "${requestData.slug}")`
        await connection.promise().query(addMessageQuery).catch(e => {result = e})
        response = result
        res.send(response)
    }
    else{
        response = result
        res.send(response)
        response = null
    }
    res.send(response)
    response = null

})
server.post('/api/getForumTopics', async (req, res) => {
    console.log(">>>>> GET FORUM TOPICS")
    console.log(">>>>> req.body", req.body)

    //[ 'message', 'code', 'errno', 'sql', 'sqlState', 'sqlMessage' ]
    let data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    const query = `SELECT ForumTopics.*, Users.username as username FROM ForumTopics
        INNER JOIN Users
            ON ForumTopics.userId = Users.id
        WHERE categorySlug = "${requestData.slug}" ORDER BY createdAt DESC`


    //SELECT * FROM ForumMessages ORDER BY createdAt DESC LIMIT 1
    //LEFT JOIN ForumMessages
    //ON ForumMessages.createdAt = (SELECT * FROM ForumMessages ORDER BY createdAt DESC LIMIT 1) as lastCreatedBy
    //LEFT JOIN (SELECT * FROM ForumMessages ORDER BY createdAt DESC LIMIT 1) as lastCreatedBy
    //ON ForumTopics.slug = ForumMessages.topicSlug
    // последнее_значение(Users.username)
    //      из(у всех у кого ForumTopics.userId
    //      сортировать по Users.username) как lastUsername
    await connection.promise()
        .query(query).then(res => response = res)
        .then(r => response = r)
        .catch(e => response = e)
    let topics = response[0]
    for(let i = 0; i < topics.length; i++){
        console.log("1["+i+"]", topics[i])
        let lastUserId = 0
        const lastCreatedAtQuery = `SELECT ForumMessages.createdAt, ForumMessages.userId FROM ForumMessages WHERE topicSlug = "${topics[i].slug}" ORDER BY createdAt DESC LIMIT 1`
        await connection.promise()
            .query(lastCreatedAtQuery)
            .then(res => {topics[i].lastCreatedAt = res[0][0].createdAt; lastUserId = res[0][0].userId})
            .catch(e => console.log('err', e))
        const lastUsernameQuery = `SELECT Users.username FROM Users WHERE id = ${lastUserId}`
        await connection.promise()
            .query(lastUsernameQuery)
            .then(res => topics[i].lastUsername = res[0][0].username)
            .catch(e => console.log('err', e))
        console.log("2["+i+"]", topics[i])
    }
    //console.log("RESPONSE", Object.keys(response[0]))
    //console.log("RESPONSE", Object.keys(response[1])

    res.send(topics)
    response = null

})
server.post('/api/getLastForumTopics', async (req, res) => {
    let data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    const query = `SELECT ForumTopics.*, Users.username AS username FROM ForumTopics AS FT
        INNER JOIN Users
            ON FT.userId = Users.id
        ORDER BY createdAt DESC LIMIT 5`

    await connection.promise()
        .query(query).then(res => response = res)
        .then(r => response = r)
        .catch(e => response = e)
    console.log(response)

    let topics = response ? response[0] : []
    for(let i = 0; i < topics.length; i++){
        console.log("1["+i+"]", topics[i])
        let lastUserId = 0
        const lastCreatedAtQuery = `SELECT ForumMessages.createdAt, ForumMessages.userId FROM ForumMessages WHERE topicSlug = "${topics[i].slug}" ORDER BY createdAt DESC LIMIT 1`
        await connection.promise()
            .query(lastCreatedAtQuery)
            .then(res => {topics[i].lastCreatedAt = res[0][0].createdAt; lastUserId = res[0][0].userId})
            .catch(e => console.log('err', e))
        const lastUsernameQuery = `SELECT Users.username FROM Users WHERE id = ${lastUserId}`
        await connection.promise()
            .query(lastUsernameQuery)
            .then(res => topics[i].lastUsername = res[0][0].username)
            .catch(e => console.log('err', e))
        console.log("2["+i+"]", topics[i])
    }

    console.log("RESPONSE", topics)
    res.send(topics)
    response = null
})
server.post('/api/incrementForumTopicViews', async (req, res) => {
    let data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    console.log("CHANGE VIEWS OF ID:", requestData.id)
    const query = `UPDATE ForumTopics SET views = views + 1 WHERE id = ${requestData.id}`
    response = await connection.promise().query(query).catch(e => response = e)
    console.log("RESPONSE", response[0])
    //res.send(response[0])
    response = null
})
server.post('/api/setForumTopicMsgCount', async (req, res) => {
    let data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    console.log("CHANGE MSG OF topicSlug:", requestData.topicSlug)
    const query = `SELECT count(*) FROM ForumMessages WHERE topicSlug = "${requestData.topicSlug}"`
    response = await connection.promise().query(query).catch(e => response = e)
    let tmp = Object.values(response[0])
    const msgCount = Object.values(tmp[0])[0]
    const querySetCount = `UPDATE ForumTopics SET messagesCount = ${msgCount} WHERE slug = "${requestData.topicSlug}"`
    response = await connection.promise().query(querySetCount).catch(e => response = e)
    //console.log("RESPONSE", response[0])
    res.send(response[0])
    response = null
})


//FORUM MESSAGES
server.post('/api/getForumMessages', async (req, res) => {
    console.log(">>>>> req.body", req.body)

    let data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    //console.log(">>", requestData.topicSlug)

    const query = `SELECT ForumMessages.*, Users.username as username FROM ForumMessages 
        LEFT JOIN Users
        ON ForumMessages.userId = Users.id
        WHERE topicSlug = "${quotesDispatcher(requestData.topicSlug)}"`

    response = await connection.promise().query(query).catch(e => response = e)
    //console.log("RESPONSE", response)
    res.send(response[0])
    response = null

})
server.post('/api/setNewForumMessage', async (req, res) => {

    const data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    console.log("SERVER: setNewForumMessage()", requestData)

    const addMessageQuery = `insert into ForumMessages(message, createdAt, userId, topicSlug)
        values("${quotesPatcher(requestData.message)}", "${requestData.createdAt}", ${requestData.userId}, "${quotesPatcher(requestData.topicSlug)}")`
    let resInfo
    response = await connection.promise().query(addMessageQuery)
        .then(res => resInfo = res[0])
        .catch(e => {
            console.log("e", e)
            response = {data: null, error: e.code}
        })

    console.log("SET LAST_ID:", resInfo?.insertId, ' FOR SLUG:', requestData.topicSlug)

    const setLastMessageQuery = `UPDATE ForumTopics SET lastCreatedAt = "${requestData.createdAt}", lastUserId = ${requestData.userId} WHERE slug = "${requestData.topicSlug}"`
    await connection.promise().query(setLastMessageQuery)
        .then(res => response = res)
        .catch(e => {
            console.log("e", e)
            response = {data: null, error: e.code}
        })


    res.send(response)
})
server.post('/api/editForumMessage', async (req, res) => {
    let data = Object.keys(req.body)

    const requestData = JSON.parse(data[0])
    console.log("SERVER: data[0]", data[0])
    const query = `UPDATE ForumMessages SET message = "${quotesPatcher(requestData.message)}" WHERE id = "${requestData.id}"`

    let result = 'SUCCESSFUL'
    await connection.promise().query(query)
        .then(() => {console.log('then ->', data)})
        .catch(e => {result = e})
    response = result
    console.log("SERVER: MSG EDITED WITH RESULT ->", result)


    res.send(response)
    response = null
})


//MAIN CATEGORIES
server.post('/api/getCategories', async (req, res) => {
    let data = Object.keys(req.body)
    await getCategories()
    res.send(response)
    response = null
})
async function getCategories(){
    const query = `SELECT * FROM MainCategories`
    let result = 'SUCCESSFUL'
    const data = await connection.promise().query(query)
        .then(() => {console.log('then ->', data)})
        .catch(e => {result = e})
    response = result
    console.log("SERVER: GOT MAIN CATEGORIES", result)
}


//UTILS
function createToken(){
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for(let i = 0; i < 20; i++){
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function quotesPatcher(data){
    //console.log("res_t0", data)
    let result = data
    for(let i = 0; i < result.length; i++){

        //console.log('=>', result[i])
        if(result[i] === '"'){
            result = result.slice(0, i)+"\""+result.slice(i)
            i++
        }
        else if(result[i] === '\'')
            result[i] = '\\'+result[i]
        else if(result[i] === '\`')
            result[i] = '\\'+result[i]
    }
    //console.log("res_t1", result)
    return result
}
function quotesDispatcher(data){
    //console.log("res_t0", data)
    let result = data
    for(let i = 0; i < result.length; i++){

        console.log('=>', result[i])
        if(result[i] === '"'){
            result = result.slice(0, i)+"\\"+result.slice(i)
            i++
        }
        else if(result[i] === '\'')
            result[i] = '\\'+result[i]
        else if(result[i] === '\`')
            result[i] = '\\'+result[i]
    }
    //console.log("res_t1", result)
    return result
}

//server.use(function(err, req, res, next) {
//    console.error(err.stack);
//    //res.status(500).send('Something broke!');
//});

server.get('*', async () => {
    console.log("** *** ** *** ** *** ** *** ** *** ** *** ** *** ** ***")
})
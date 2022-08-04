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

let currentUser = null
let response = null

let users = [
    {id: 1, username: 'superuser', password: '000000', token: null, tokenUpdate: null},
    {id: 2, username: 'user_1', password: '111111', token: null, tokenUpdate: null},
    {id: 3, username: 'user_2', password: '222222', token: null, tokenUpdate: null},
    {id: 4, username: 'user_3', password: '333333', token: null, tokenUpdate: null},
    {id: 5, username: 'user_4', password: '444444', token: null, tokenUpdate: null},
]

let categories = [
    {
        id: 1,
        title: "Политика/Новости",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 2,
        title: "Форум",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 3,
        title: "Муниципальные/Социальные программы",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 4,
        title: "Проекты/Голосования",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 5,
        title: "Юриспруденция",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 6,
        title: "ЖКХ",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 7,
        title: "Объявления",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 8,
        title: "Трудоустройство",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
    {
        id: 9,
        title: "Частные услуги",
        description: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n",
    },
]

let news = [
    {
        id: 1,
        title: "Новостной заголовок #1",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 2,
        title: "Новостной заголовок #2",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 3,
        title: "Новостной заголовок #3",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 4,
        title: "Новостной заголовок #4",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 5,
        title: "Новостной заголовок #5",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 6,
        title: "Новостной заголовок #6",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 7,
        title: "Новостной заголовок #7",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 8,
        title: "Новостной заголовок #8",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 9,
        title: "Новостной заголовок #9",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
    {
        id: 10,
        title: "Новостной заголовок #10",
        article: "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.\n\n Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.",
        content: {},
        date: Date,
    },
]
//server.use(express.static(__dirname));
//server.get('/*', function(req, res) {
//    console.log("GET /*")
//    res.sendFile(path.join(__dirname, 'index.html'))
//})
//server.get('/news', function(req, res) {
//    console.log("GET /news")
//    res.sendFile(path.join(__dirname, 'index.html'))
//})








//REGISTRATION/LOG IN
server.post('/api/getRegistration', async (req, res) => {
    console.log("BACK GOT REG REQUEST", req)
    let data = Object.keys(req.body)
    await getRegistration(JSON.parse(data[0]).username.toString(), JSON.parse(data[0]).password.toString())
    res.send(response)
    if(response !== null) response = null
})
async function getRegistration(username, password){
    response = {}
    console.log("SENDED", username, password)
    const query = `SELECT id FROM users WHERE username = "${username}"`
    const result = await connection.promise().query(query)
    console.log("RESSss:", result[0])
    const isUserExists = result[0].length === 0 ? false : true
    console.log("isUserExists", isUserExists)
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
        const fullUserDataQuery = `INSERT INTO users(username, password, token, token_update) VALUES ("${username}","${password}","${newToken}","${tokenExpDate}")`
        const fullUserData = await connection.promise().query(fullUserDataQuery)
        const checkQuery = `SELECT * FROM users WHERE username = "${username}"`
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
    const query = `SELECT id FROM users WHERE username = "${username}" AND password = "${password}"`
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
        const setTokenQuery = `UPDATE users SET token = "${newToken}", token_update = "${tokenExpDate}" WHERE username = "${username}" AND password = "${password}"`
        await connection.promise().query(setTokenQuery)
        const fullUserDataQuery = `SELECT id, username, token, token_update FROM users WHERE username = "${username}" AND password = "${password}"`
        const fullUserData = await connection.promise().query(fullUserDataQuery)
        response = fullUserData[0]
    }
    else{
        response = 'INCORRECT'
    }
}









//LOG OUT
server.get('/api/logOut', (req, res) => {
    for(let i = 0; i < users.length; i++){
        console.log(users[i])
        if(currentUser === users[i]){
            users[i].token = null
            users[i].tokenUpdate = null
            currentUser = null
        }
    }
    res.send(response)
})










//NEWS
server.post('/api/getNews', async (req, res) => {
    console.log("SERVER:", 'getNews()')
    let data = Object.keys(req.body)
    await getNews(Number(JSON.parse(data[0]).quantity))
    res.send(response)
    response = null
})
async function getNews(quantity){
    if(quantity === 0){
        const query = 'SELECT * FROM news ORDER BY id DESC'
        let data = await connection.promise().query(query)
        response = JSON.stringify(data[0])
        console.log("SERVER: NEWS OBTAINED")
    }
    //else if(quantity > 0){
    //    response = JSON.stringify([...news.slice(quantity*-1)])
    //}
}











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
    //await connection.promise().query(query).catch(e => {result = e})
    //response = result
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
    //console.log("DATA", data)
    const requestData = JSON.parse(data)
    console.log("SERVER: getCategoryParent("+requestData.id+")")
    //console.log("DATA", requestData)
    const query = `SELECT * FROM ForumCategories WHERE id=${requestData.id}`
    let result = await connection.promise().query(query)
    response = JSON.stringify(result[0])
    //await connection.promise().query(query).catch(e => {result = e})
    //response = result
    //console.log("SERVER: GOT FORUM CATEGORY PARENT")
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
    console.log("SERVER: setNewTopic()", requestData)
    //title, slug, authorId, categoryId, message, date
    let result = 'SUCCESSFUL'
    const insertTopicQuery = `insert into ForumTopics(title, slug, authorId, categoryId) 
        values("${requestData.title}", "${requestData.slug}", ${requestData.authorId}, ${requestData.categoryId})`
    let topicResponse = await connection.promise().query(insertTopicQuery).catch(e => {result = e})

    console.log("SERVER: TR:", topicResponse[0].insertId)
    if(result === "SUCCESSFUL"){
        const addMessageQuery = `insert into Messages(userId, topicId, message, createdBy, date) 
        values("${requestData.authorId}", "${topicResponse[0].insertId}", "${requestData.message}", "${requestData.date}", "${requestData.date}")`
        let messageResponse = await connection.promise().query(addMessageQuery).catch(e => {result = e})
        response = result
        res.send(response)
    }
    else{
        response = result
        res.send(response)
        response = null
    }

})


server.post('/api/getTopicsByCategoryId', async (req, res) => {
    const data = Object.keys(req.body)
    console.log("SERVER: data >>>>", data)
    const requestData = JSON.parse(data[0])
    console.log("SERVER: getTopicsByCategoryId("+requestData.id+")", requestData.id)
    const query = `select * from ForumTopics where categoryId = ${requestData.id}`
    const answer = await connection.promise().query(query)
    console.log("ANSWER:", answer[0])
    res.send(answer[0])
})











//FORUM MESSAGES
server.post('/api/setNewMessage', async (req, res) => {
    let data = Object.keys(req.body)
    const requestData = JSON.parse(data[0])
    console.log("NM:", requestData)

    const addMessageQuery = `insert into Messages(userId, topicId, message, createdBy, date) 
        values(${requestData.userId}, ${requestData.topicId}, "${requestData.message}", "${requestData.createdBy}", "${requestData.date}")`

    const answer = await connection.promise().query(addMessageQuery)
    console.log("ANSWER:", answer[0])
    res.send(answer[0])
})

server.post('/api/getMessages', async (req, res) => {
    let data = Object.keys(req.body)
    await getMessages()
    res.send(response)
    response = null
})
async function getMessages(){
    console.log("START GET MESSAGES")
    const query = 'SELECT * FROM Messages'
    let data = await connection.promise().query(query)
    response = JSON.stringify(data[0])
    console.log("MESSAGES OBTAINED")
}

server.post('/api/getForumMessagesByTopicId', async (req, res) => {
    const data = Object.keys(req.body)
    console.log("SERVER: data >>>>", data)
    const requestData = JSON.parse(data[0])
    console.log("SERVER: getMessagesByCategoryId("+requestData.id+")", requestData.id)
    const query = `select * from Messages where topicId = ${requestData.id}`
    const answer = await connection.promise().query(query)
    console.log("ANSWER:", answer[0])
    res.send(answer[0])
})

server.post('/api/editMessage', async (req, res) => {
    let data = Object.keys(req.body)
    await editMessage(data)
    res.send(response)
    response = null
})
async function editMessage(data){
    console.log("ddddataaa2", `${data}`)
    const requestData = JSON.parse(data)
    const query = `UPDATE Messages SET message = "${requestData.message}" WHERE id = "${requestData.id}"`

    let result = 'SUCCESSFUL'
    await connection.promise().query(query)
        .then(() => {console.log('then ->', data)})
        .catch(e => {result = e})
    response = result
    console.log("SERVER: MSG EDITED WITH RESULT ->", result)
}








//MAIN CATEGORIES
server.post('/api/getCategories', (req, res) => {
    getCategories()
    res.send(response)
})
function getCategories(){
    response = JSON.stringify([...categories])
    console.log("SERVER_GETS_CATS", categories)
}







function createToken(){
    let result           = '';
    let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for(let i = 0; i < 20; i++){
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}
function checkReceivedData(userslist, username, password){
    response = JSON.stringify('unkuser')
    for(let i = 0; i < userslist.length; i++){
        console.log(userslist[i].username, username)
        if(userslist[i].username === username){
            if(userslist[i].password === password){
                currentUser = users[i]
                users[i].token = createToken()
                let time = new Date
                time.setMinutes(time.getMinutes()+5)
                users[i].tokenUpdate = time
                response = JSON.stringify(users[i])
                break
            }
            response = JSON.stringify('wrongpass')
            break
        }
    }
}
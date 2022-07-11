const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');

const PORT = 3002

const server = express()
server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))

let currentUser = null
let response = null

let users = [
    {username: 'superuser', password: '000000', token: null, expirationTokenTime: null},
    {username: 'user_1', password: '111111', token: null, expirationTokenTime: null},
    {username: 'user_2', password: '222222', token: null, expirationTokenTime: null},
    {username: 'user_3', password: '333333', token: null, expirationTokenTime: null},
    {username: 'user_4', password: '444444', token: null, expirationTokenTime: null},
]

server.post('/api/getAuth', (req, res) => {
    let data = Object.keys(req.body)
    checkReceivedData(users, JSON.parse(data[0]).username.toString(), JSON.parse(data[0]).password.toString())
    res.send(response)
})

server.get('/api/logOut', (req, res) => {
    for(let i = 0; i < users.length; i++){
        console.log(users[i])
        if(currentUser === users[i]){
            users[i].token = null
            users[i].expirationTokenTime = null
            currentUser = null
        }
    }
    res.send(response)
})

server.listen(PORT, () => {
    console.log(`OPENED PORT: ${PORT}`)
    console.log("SERVER LISTENING...")
})

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
                users[i].expirationTokenTime = time
                response = JSON.stringify(users[i])
                break
            }
            response = JSON.stringify('wrongpass')
            break
        }
    }
}
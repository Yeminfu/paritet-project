import axios from "axios";


export default class Fetcher{

    controller: any;
    //baseUrl = 'https://maksia2w.beget.tech'
    baseUrl = 'http://62.113.110.6:3002'


    constructor(){
        this.controller = axios.create({
            baseURL: this.baseUrl,
            headers: {
                accept: 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        })
    }

    async setAuth(username: String, password: String){
        return await this.controller.post('/api/login', JSON.stringify({
            username: username,
            password: password,
        }))
            .then(function (response: any){
                console.log(response);
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

    async getAccountInfo(username: String, password: String){
        //return await this.controller.get(`${this.baseUrl}/api/user/getAccountInfo?login=superuser&passwd=password123456789`)
        return await this.controller.get(`${this.baseUrl}/getAccountInfo?login=superuser&passwd=password123456789`)
            .then(function (response: any){
                console.log(response);
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

    async logOut(user: any){
        return await this.controller.get(`${this.baseUrl}/api/logOut`)
            .then(function(response: any){

            })
    }

    async getAuth(username: String, password: String){
        return await this.controller.post(`${this.baseUrl}/api/getAuth`, JSON.stringify({
            username: username,
            password: password,
        }))
            .then(function (response: any){

                console.log("FRONT GOT AUTH RESPONSE:", response);
                if(response.data[0].username && response.data[0].token && response.data[0].token_update){
                    return response.data[0]
                }
                else if(response.data === "INCORRECT"){
                    return null
                }
                else{
                    return undefined
                }
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

    async getRegistration(username: String, password: String){
        return await this.controller.post(`${this.baseUrl}/api/getRegistration`, JSON.stringify({
            username: username,
            password: password,
        }))
            .then(function (response: any){

                console.log("FRONT GOT REG RESPONSE:", response);
                if(response.data[0].username && response.data[0].token && response.data[0].token_update){
                    return response.data[0]
                }
                else if(response.data === "TAKEN"){
                    return null
                }
                else if(response.data === "FAILED"){
                    return 0
                }
                else{
                    return undefined
                }
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

    async getNews(quantity?: number){
        return await this.controller.post(`${this.baseUrl}/api/getNews`, JSON.stringify({
            quantity: quantity?.toString()
        }))
            .then(await function (response: any){
                console.log("FRONT GOT NEWS RESPONSE:", response)
                return response
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

    async getCategories(){
        return await this.controller.post(`${this.baseUrl}/api/getCategories`)
            .then(await function (response: any){
                console.log("FRONT GOT CATEGORIES RESPONSE:", response)
                return response
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

}
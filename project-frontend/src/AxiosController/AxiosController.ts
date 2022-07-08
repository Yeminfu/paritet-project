import axios from "axios";


export default class AxiosController{

    controller: any;
    //baseUrl = 'https://maksia2w.beget.tech'
    baseUrl = 'http://localhost:3002'


    constructor(){
        this.controller = axios.create({
            baseURL: this.baseUrl,
            headers: {
                accept: 'application/json',
            },
        })
    }

    //async getAuth(user: String){
    //    return await this.controller.get(``)
    //}

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
                console.log("FRONT GOT RESPONSE:", response);
                if(response.data === 'unkuser'){
                    return 'unkuser'
                }
                if(response.data === 'wrongpass'){
                    return 'wrongpass'
                }
                return response.data
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

}
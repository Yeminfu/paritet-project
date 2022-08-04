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






    async setNewForumCategory(data: {title: string, slug: string, parent: number | null, description: string, hasChildren: boolean}){
        console.log("FETCHER: DATA ->", data)
        console.log("FETCHER: BOOLEAN ->", data.hasChildren)
        console.log("FETCHER: TO NUMBER ->", Number(data.hasChildren))
        return await this.controller.post(`${this.baseUrl}/api/setNewForumCategory`, JSON.stringify({
            title: data.title,
            slug: data.slug,
            parent: data.parent,
            description: data.description,
            hasChildren: Number(data.hasChildren),
        }))
            .then(await function (response: any){
                console.log("FETCHER1: GOT SET NEW FORUM CATEGORY RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }

    async getForumCategories(){
        return await this.controller.post(`${this.baseUrl}/api/getForumCategories`)
            .then(await function(response: any){
                console.log("FETCHER2:", response.data)
                return response.data
            })
            .catch((e: any) => e)
    }

    async getForumCategoriesByParentId(id: number){
        return await this.controller.post(`${this.baseUrl}/api/getForumCategoriesByParentId`, JSON.stringify({
            id: id,
        }))
            .then(await function(response: any){
                console.log("FETCHER3:", response.data)
                return response.data
            })
            .catch((e: any) => e)
    }

    async getCategoryParent(id: number){
        return await this.controller.post(`${this.baseUrl}/api/getCategoryParent`, JSON.stringify({
            id: id,
        }))
            .then(await function(response: any){
                console.log("FETCHER4:", response.data)
                return response.data
            })
            .catch((e: any) => e)
    }

    async editForumCategory(data: {id: number, title: string, slug: string, parent: number | null, description: string, hasChildren: boolean}){
        console.log("FETCHER: DATA ->", data)
        console.log("FETCHER: BOOLEAN ->", data.hasChildren)
        console.log("FETCHER: TO NUMBER ->", Number(data.hasChildren))
        return await this.controller.post(`${this.baseUrl}/api/editForumCategory`, JSON.stringify({
            id: data.id,
            title: data.title,
            slug: data.slug,
            parent: data.parent,
            description: data.description,
            hasChildren: Number(data.hasChildren),
        }))
            .then(await function (response: any){
                console.log("FETCHER5: GOT EDIT FORUM CATEGORY RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }

    async deleteForumCategory(id: number){
        return await this.controller.post(`${this.baseUrl}/api/deleteForumCategory`, JSON.stringify({
            id: id,
        }))
            .then(await function (response: any){
                console.log("FETCHER6: GOT DELETE FORUM CATEGORY RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }







    async setNewForumTopic(data: {title: string, slug: string, authorId: number, categoryId: number, message: string, date: string}){
        return await this.controller.post(`${this.baseUrl}/api/setNewForumTopic`, JSON.stringify({
            title: data.title,
            slug: data.slug,
            authorId: data.authorId,
            categoryId: data.categoryId,
            message: data.message,
            date: data.date,
        }))
            .then(await function (response: any){
                console.log("FETCHER009: GOT SET NEW FORUM TOPIC RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }

    async getTopicsByCategoryId(id: number){
        return await this.controller.post(`${this.baseUrl}/api/getTopicsByCategoryId`, JSON.stringify({
            id: id,
        }))
            .then(await function (response: any){
                console.log("FETCHER010: GOT FORUM TOPICS BY ID RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }








    async getMessages(){
        return await this.controller.post(`${this.baseUrl}/api/getMessages`)
            .then(await function (response: any){
                console.log("FRONT GOT MESSAGES RESPONSE:", response)
                return response
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

    async getForumMessagesByTopicId(id: number){
        return await this.controller.post(`${this.baseUrl}/api/getForumMessagesByTopicId`, JSON.stringify({
            id: id,
        }))
            .then(await function (response: any){
                console.log("FETCHER011: GOT FORUM MESSAGES BY TOPIC_ID RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }

    async setNewMessage(data: {userId: number, topicId: number, message: string, createdBy: string, date: string}){
        console.log("fetcher", data)
        return await this.controller.post(`${this.baseUrl}/api/setNewMessage`, JSON.stringify({
            userId: data.userId,
            topicId: data.topicId,
            message: data.message,
            createdBy: data.createdBy,
            date: data.date
        }))
            .then(await function (response: any){
                console.log("FRONT GOT SETTED MESSAGES RESPONSE:", response)
                return response
            })
            .catch(function (error: any){
                console.log(error);
            })
    }

    async editMessage(id: number, message: string){

        return await this.controller.post(`${this.baseUrl}/api/editMessage`, JSON.stringify({
            id: id,
            message: message
        }))
            .then(await function (response: any){
                console.log("FRONT GOT EDITED MESSAGE RESPONSE:", response)
                return response
            })
            .catch(function (error: any){
                console.log(error);
            })
    }


}
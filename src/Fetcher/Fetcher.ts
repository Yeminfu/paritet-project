import axios from "axios"
import swal from 'sweetalert2'
import Utils from "../lib/utils";

const utils = new Utils()

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


    //REGISTRATION/AUTHORIZATION
    async getAuth(username: String, password: String){
        return await this.controller.post(`${this.baseUrl}/api/getAuth`, JSON.stringify({
            username: username,
            password: password,
        }))
            .then(function (response: any){

                console.log("FRONT GOT AUTH RESPONSE:", response);
                if(response.data[0].username && response.data[0].token && response.data[0].tokenUpdate){
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
                if(response.data[0].username && response.data[0].token && response.data[0].tokenUpdate){
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


    //NEWS
    async getLastNews(){
        return await this.controller.post(`${this.baseUrl}/api/getLastNews`)
            .then(await function (response: any){
                console.log("FRONT GOT LAST NEWS RESPONSE:", response)
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
    async getNewsDetails(slug: string){
        return await this.controller.post(`${this.baseUrl}/api/getNewsDetails`, JSON.stringify({
            slug: slug
        }))
            .then(await function (response: any){
                console.log("FRONT GOT NEWS DETAILS RESPONSE:", response)
                return response.data[0]
            })
            .catch(function (error: any){
                console.log(error);
            })
    }


    //FORUM CATEGORIES
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


    //FORUM TOPICS
    async setNewForumTopic(data: {title: string, slug: string, userId: number, categorySlug: string, message: string, date: string, username: string | undefined}){
        return await this.controller.post(`${this.baseUrl}/api/setNewForumTopic`, JSON.stringify({
            title: data.title,
            slug: data.slug,
            userId: data.userId,
            categorySlug: data.categorySlug,
            message: data.message,
            date: data.date,
            username: data.username
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
    async getForumTopics(slug: string){
        console.log("getForumTopics:", slug)
        return await this.controller.post(`${this.baseUrl}/api/getForumTopics`, JSON.stringify({
            slug: slug,
        }))
            .then(await function (response: any){
                console.log("FETCHER015: GOT FORUM TOPICS RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }
    async getLastForumTopics(slug: string){
        console.log("getLastForumTopics:", slug)
        return await this.controller.post(`${this.baseUrl}/api/getLastForumTopics`, JSON.stringify({
            slug: slug,
        }))
            .then(await function (response: any){
                console.log("FETCHER018: GOT LAST 5 FORUM TOPICS RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }
    async incrementForumTopicViews(id: number){
        return await this.controller.post(`${this.baseUrl}/api/incrementForumTopicViews`, JSON.stringify({
            id: id,
        }))
            .then(await function (response: any){
                console.log("FETCHER023: GOT RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }
    async setForumTopicMsgCount(topicSlug: string){
        return await this.controller.post(`${this.baseUrl}/api/setForumTopicMsgCount`, JSON.stringify({
            topicSlug: topicSlug,
        }))
            .then(await function (response: any){
                console.log("FETCHER022: GOT RESPONSE:", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }

    //FORUM MESSAGES
    async getForumMessages(topicSlug: string){
        return await this.controller.post(`${this.baseUrl}/api/getForumMessages`, JSON.stringify({
            topicSlug: utils.quotesDispatcher(topicSlug),
        }))
            .then(await function (response: any){
                console.log("FETCHER016: GOT FORUM MESSAGES BY SLUG RESPONSE "+topicSlug+":", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
                return error
            })
    }
    async setNewForumMessage(data: {message: string, createdAt: string, userId: number, topicSlug: string}){

        //this.controller.interceptors.response.use((response: any) => {
        //        console.log("fFETCHER017 SET NEW FORUM MESSAGE", response.data)
        //        return response.data;
        //    },
        //    (error: any) => {
        //        console.log("fetcher error", error)
        //        swal.fire(
        //            `${JSON.stringify(error.name, null, " ")}`,
        //            `<pre class="text-left">${JSON.stringify(error.message, null, " ")}</pre>`
        //        )
        //        return error;
        //    })

        return await this.controller.post(`${this.baseUrl}/api/setNewForumMessage`, JSON.stringify({
            message: data.message,
            createdAt: data.createdAt,
            userId: data.userId,
            topicSlug: data.topicSlug,
        }))
            .then(await function(response: any){
                console.log("fFETCHER017 SET NEW FORUM MESSAGE", response.data)
                return response
            })
            .catch(function (error: any){
                console.log(error);
            })
    }
    async editForumMessage(id: number, message: string){

        return await this.controller.post(`${this.baseUrl}/api/editForumMessage`, JSON.stringify({
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
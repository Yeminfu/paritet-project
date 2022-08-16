import { useList } from "effector-react";
import {$breadCrumbs, /*addBreadCrumbs,*/ setBreadCrumbs} from "../store/store";

export default class Utils{

    constructor(){}

    formatDate(date: string){
        const publishDate = new Date(date)
        const day = publishDate.getDate().toString()
        const month = (publishDate.getMonth()+1).toString()
        const year = publishDate.getFullYear().toString()
        const hour = publishDate.getHours().toString()
        const minute = publishDate.getMinutes().toString()

        return `${('0'+day).slice(-2)}.${('0'+month).slice(-2)}.${year}г. ${('0'+hour).slice(-2)}:${('0'+minute).slice(-2)}`
    }

    formatDateWithoutTimeZone(date: string){
        const publishDate = new Date(new Date(date).getTime() + new Date().getTimezoneOffset()/60*3600*1000)
        const day = publishDate.getDate().toString()
        const month = (publishDate.getMonth()+1).toString()
        const year = publishDate.getFullYear().toString()
        const hour = publishDate.getHours().toString()
        const minute = publishDate.getMinutes().toString()
        return `${('0'+day).slice(-2)}.${('0'+month).slice(-2)}.${year}г. ${('0'+hour).slice(-2)}:${('0'+minute).slice(-2)}`
    }

    formatDateForDB(date: Date){
        const day = date.getDate().toString()
        const month = (date.getMonth()+1).toString()
        const year = date.getFullYear().toString()
        const hour = date.getHours().toString()
        const minute = date.getMinutes().toString()
        const second = date.getSeconds().toString()

        return `${year}-${('0'+month).slice(-2)}-${('0'+day).slice(-2)} ${('0'+hour).slice(-2)}:${('0'+minute).slice(-2)}:${('0'+second).slice(-2)}`
    }

    setBreadCrumbs(address: string){
        console.log("STRING", address)
        let data = $breadCrumbs.getState()
        console.log("$$$$", $breadCrumbs.getState())
        data.push({crumb: address})
        console.log("/////", data)
        setBreadCrumbs(data)
        //addBreadCrumbs({crumb: address})

        //console.log("DATA?", data)

        //data.push(address)

        //const arr = new Array(address.split('/'))
        //console.log("aRR1", arr)
        //let str = arr.shift()
        //console.log("aRR2", str)
        //const result = str?.map((e,index) => {
        //    if(index > 0)
        //        return ''
        //})
        //console.log("////", result)
        //return address === '/'
        //    ? '<>Главная</>'
        //    :
    }

}


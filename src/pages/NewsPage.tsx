import React, {ReactNode, useEffect, useState} from 'react'
import 'antd/dist/antd.min.css'
import './MainPage.scss'
import Fetcher from "../Fetcher/Fetcher";
import NewsModuleComponent from '../components/NewsModuleComponent';
import {Link} from "react-router-dom";
import PageComponent from "./base/PageComponent";

interface Props{
    children?: ReactNode;
    user: any;
}

const onSearch = (value: string) => console.log(value)

export default function NewsPage({children, user}: Props){
    console.log("START NEWS PAGE")
    const [news, setNews] = useState([])

    let fetcher = new Fetcher()

    useEffect(() => {
        console.log("START NEWS PAGE USE EFFECT")
        async function loadNews(){
            try{
                const response = await fetcher.getNews(0)
                const data = response.data.filter((e: any) => {
                    console.log("EEE", e.small_img)
                    if(e.small_img !== 'undefined' && e.small_img !== undefined)
                        return e
                })
                console.log("DATA", ...[data])
                setNews(data)
            } catch{

            }
        }
        loadNews();
    }, []);

    function getURLTemplate(url: string){
        return `/news/${url.slice(25)}`
    }

    const getData = news?.map(function(e:any, index){
        return <Link key={index}
                     to={getURLTemplate(e.url)} state={
                         {
                             url: e.url,
                             title: e.title,
                             description: e.description,
                             blocks: e.blocks,
                             smallImg: e.smallImg,
                             publishDateTime: e.publishDateTime
                         }
                     }>
            <NewsModuleComponent data={e}/>
        </Link>

    })

    return(
        <PageComponent>
            { [getData] }
        </PageComponent>
    )
}
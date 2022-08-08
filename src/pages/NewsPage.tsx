import React, {ReactNode, useEffect, useState} from 'react'
import Fetcher from "../Fetcher/Fetcher";
import NewsModuleComponent from '../components/NewsModuleComponent';
import DefaultTmp from "../components/DefaultTmp";
import AuthChecker from "../components/AuthChecker";

interface Props{
    children?: ReactNode;
}

export default function NewsPage({children}: Props){
    console.log("START NEWS PAGE")
    const [news, setNews] = useState([])

    let fetcher = new Fetcher()

    useEffect(() => {
        async function loadNews(){
            const response = await fetcher.getNews(0)
            const data = response.data.filter((e: any) => {
                if(e.small_img !== 'undefined' && e.small_img !== undefined)
                    return e
            })
            setNews(data)
        }
        loadNews();
    }, []);

    function getURLTemplate(url: string){
        return `/news/${url.slice(25)}`
    }

    return(
        <AuthChecker>
            <DefaultTmp>
                {
                    news?.map(function(e:any, index){
                        return <NewsModuleComponent data={e} key={index}/>
                    })
                }
            </DefaultTmp>
        </AuthChecker>
    )
}
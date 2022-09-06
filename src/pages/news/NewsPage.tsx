import React, {ReactNode, useEffect, useLayoutEffect, useState} from 'react'
import Fetcher from "../../Fetcher/Fetcher";
import NewsModuleComponent from '../../components/news/NewsModuleComponent';
import DefaultTmp from "../../components/base/DefaultTmp";
import {
    $mainCoords,
    $newsCache,
    $newsCoords,
    setBreadCrumbs,
    setMainCoords,
    setNewsCache,
    setNewsCoords
} from "../../store/store";
import PreloaderComponent from "../../components/common/PreloaderComponent";

interface Props{
    children?: ReactNode;
}

interface NewsModel {
    id: number;
    title: string;
    slug: string;
    description: string;
    dateTime: string;
    content: [];
}

export default function NewsPage({children}: Props){
    const [news, setNews] = useState<null | NewsModel[]>(null)
    const [isLoaded, setIsLoaded] = useState(true)

    let fetcher = new Fetcher()

    useEffect(() => {
        setIsLoaded(true)
        setBreadCrumbs(['Главная', 'Новости'])
        async function loadNews(){
            const response = await fetcher.getNews(0)
            const data = response.data.filter((e: any) => {
                if(e.smallImg !== 'undefined' && e.smallImg !== undefined)
                    return e
            })
            setNews(data)
            setNewsCache(data)
            setIsLoaded(false)
            console.log("NEWS SCROLL TO", $newsCoords.getState())
            setTimeout(() => {
                window.scrollTo(0, $newsCoords.getState())
                console.log("CHECK", $newsCoords.getState())
            }, 0)
        }
        if(!$newsCache.getState()){
            console.log("FROM BACK")
            loadNews();
        }
        else{
            console.log("FROM CACHE")
            setNews($newsCache.getState())
            setIsLoaded(false)
            console.log("NEWS SCROLL TO", $newsCoords.getState())
            setTimeout(() => {
                window.scrollTo(0, $newsCoords.getState())
                console.log("CHECK", $newsCoords.getState())
            }, 0)
        }
    }, []);

    return(
        isLoaded
            ? <PreloaderComponent/>
            : <DefaultTmp getScroll={(data: number) => {setNewsCoords(data)}}>
                {
                    news?.map(function(e:any, index){
                        return <NewsModuleComponent data={e} key={index}/>
                    })
                }
            </DefaultTmp>
    )
}
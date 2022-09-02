import React, {ReactNode, useEffect, useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import './NewsDetailsComponent.scss';
import DefaultTmp from "../base/DefaultTmp";
import Utils from "../../lib/utils";
import Fetcher from "../../Fetcher/Fetcher";
import PreloaderComponent from '../common/PreloaderComponent';

interface Props{
    children?: ReactNode;
    data?: {
        url: string,
        title: string,
        description: string,
        blocks: string,
        smallImg: string,
        publishDateTime: string,
        link: string
    };
}


export default function NewsDetailsComponent({children}: Props){

    const [data, setData] = useState({
        id: 0,
        title: "",
        slug: "",
        description: "",
        smallImg: "",
        dateTime: "",
        blocks: "",
        link: ""
    })
    const [isLoaded, setIsLoaded] = useState(true)
    const utils = new Utils()
    const location = useLocation()
    const fetcher = new Fetcher()

    useEffect(() => {
        window.scrollTo(0, 0)
        setIsLoaded(true)
        async function getData(){
            let url = location.pathname.split('/', 10)
            utils.quotesPatcher(url[url.length-1])
            const response = await fetcher.getNewsDetails(url[url.length-1].replaceAll('%22', ''))
            setData(response)
            setIsLoaded(false)
        }
        getData()
    }, [])

    return(isLoaded
            ? <PreloaderComponent/>
            : <DefaultTmp getScroll={() => {}}>
                <div className={'news-details'} key={Math.random() + 1000000} style={{maxWidth: '100%'}}>
                    <div className={'news-header'}>
                        {data?.title}
                    </div>
                    <div className={'news-date'}>
                        {utils.formatDate(data?.dateTime)}
                    </div>
                    <div className={'news-description'}>
                        {data?.description}
                    </div>
                    <div className={'news-content'} dangerouslySetInnerHTML={{__html: data?.blocks}}>

                    </div>
                    <div className='news-source'>
                        <div style={{marginRight: 8}}>{'Источник:'+' '}</div>
                        <a className='source-link' href={data?.link}>{data?.link}</a>
                    </div>
                </div>
            </DefaultTmp>
    )
}
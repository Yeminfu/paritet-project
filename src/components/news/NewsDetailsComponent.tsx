import React, {ReactNode, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom';
import './NewsDetailsComponent.scss';
import DefaultTmp from "../base/DefaultTmp";
import Utils from "../../lib/utils";
import Fetcher from "../../Fetcher/Fetcher";

interface Props{
    children?: ReactNode;
    data?: {
        url: string,
        title: string,
        description: string,
        blocks: string,
        smallImg: string,
        publishDateTime: string
    };
}


export default function NewsDetailsComponent({children}: Props){

    const utils = new Utils()
    const location = useLocation()
    const fetcher = new Fetcher()
    const [data, setData] = useState({
        id: 0,
        title: "",
        slug: "",
        description: "",
        smallImg: "",
        dateTime: "",
        blocks: "",
    })
    //let data = {
    //    id: 0,
    //    title: "",
    //    slug: "",
    //    description: "",
    //    smallImg: "",
    //    dateTime: "",
    //    blocks: "",
    //}

    useEffect(() => {
        async function getData(){
            let url = location.pathname.split('/', 10)
            console.log("PATHHH", url[url.length-1])
            const response = await fetcher.getNewsDetails(url[url.length-1])
            console.log("rs", response)
            setData(response)
        }
        getData()
    }, [])

    return(
            <DefaultTmp>
                {[<div className={'news-details'} key={Math.random() + 1000000} style={{maxWidth: '100%'}}>
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
                </div>]}
            </DefaultTmp>
    )
}
import React, {ReactNode, useEffect} from 'react';
import './NewsModuleComponent.scss';
import Utils from "../lib/utils";
import {Link, useNavigate} from "react-router-dom";

interface Props{
    children?: ReactNode;
    data: {
        url: string,
        title: string,
        description: string,
        blocks: string,
        small_img: string,
        //bigImg: bigImage,
        date_time: string
    };
}

export default function NewsModuleComponent({children, data}: Props){

    const utils = new Utils()
    const navigate = useNavigate()

    useEffect(() => {
        console.log("ldd", data)
    }, [])

    function goToNewsDetails(url: string){
        console.log(url)
        return `/news/${url.slice(25)}`
    }

    return(
        <Link to={goToNewsDetails(data.url)}
              className='news-link'
              state={
                {
                    url: data.url,
                    title: data.title,
                    description: data.description,
                    blocks: data.blocks,
                    smallImg: data.small_img,
                    publishDateTime: data.date_time
                }
            }>
            <div className={'news-module'} onClick={() => {goToNewsDetails(data.url)}}>
                <h2 className={'header'}>{data.title}</h2>
                <div className={'body'}>
                    <div className={'photo-area'}>
                        <img className={'photo'} alt={''} src={data.small_img}/>
                        <div className={'datetime'}>{utils.formatDate(data.date_time)}</div>
                    </div>
                    <div className={'text-content'}>{<>{data.description}</>}</div>
                </div>
            </div>
        </Link>
    )
}
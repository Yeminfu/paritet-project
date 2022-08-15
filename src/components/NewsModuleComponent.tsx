import React, {ReactNode, useEffect} from 'react';
import './NewsModuleComponent.scss';
import Utils from "../lib/utils";
import {Link, useNavigate} from "react-router-dom";

interface Props{
    children?: ReactNode;
    data: {
        url: string,
        title: string,
        slug: string,
        description: string,
        blocks: string,
        smallImg: string,
        dateTime: string,
    };
}

export default function NewsModuleComponent({children, data}: Props){

    const utils = new Utils()

    useEffect(() => {
        console.log("ldd", data)
    }, [])

    //function goToNewsDetails(url: string){
    //    console.log(url)
    //    return `/news/${url.slice(25)}`
    //}

    return(
        <Link to={data.slug}
              className='news-link'>
            <div className={'news-module'}>
                <h2 className={'header'}>{data.title}</h2>
                <div className={'body'}>
                    <div className={'photo-area'}>
                        <img className={'photo'} alt={''} src={data.smallImg}/>
                        <div className={'datetime'}>{utils.formatDate(data.dateTime)}</div>
                    </div>
                    <div className={'text-content'}>{<>{data.description}</>}</div>
                </div>
            </div>
        </Link>
    )
}
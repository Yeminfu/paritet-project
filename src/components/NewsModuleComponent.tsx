import React, {ReactNode} from 'react';
import './NewsModuleComponent.scss';
import Utils from "../lib/utils";

interface Props{
    children?: ReactNode;
    data: {
        link: string,
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

    return(
        <div className={'news-module'}>
            <h2 className={'header'}>{data.title}</h2>
            <div className={'body'}>
                <div className={'photo-area'}>
                    <img className={'photo'} alt={''} src={data.small_img}/>
                    <div className={'datetime'}>{utils.formatDate(data.date_time)}</div>
                </div>
                <div className={'text-content'}>{<>{data.description}</>}</div>
            </div>
        </div>
    )
}
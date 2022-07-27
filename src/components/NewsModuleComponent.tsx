import React, {ReactNode} from 'react';
import './NewsModuleComponent.scss';

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

    function formatDate(date: string){
        let publishDate = new Date(date)
        const day = publishDate.getDate().toString()
        const month = (publishDate.getMonth()+1).toString()
        const year = publishDate.getFullYear().toString()
        const hour = publishDate.getHours().toString()
        const minute = publishDate.getMinutes().toString()

        return `${('0'+day).slice(-2)}.${('0'+month).slice(-2)}.${year}г. ${('0'+hour).slice(-2)}:${('0'+minute).slice(-2)}`
    }

    return (
        <div className={'news-module'}>
            <h2 className={'header'}>{data.title}</h2>
            <div className={'body'}>
                <div className={'photo-area'}>
                    <img className={'photo'} alt={''} src={data.small_img}/>
                    <div className={'datetime'}>{formatDate(data.date_time)}</div>
                </div>
                <div className={'text-content'}>{<>{data.description}</>}</div>
            </div>
        </div>
    )
}
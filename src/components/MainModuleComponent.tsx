import React, {ReactNode} from 'react';
import './MainModuleComponent.scss';

interface Props{
    children?: ReactNode;
    data: {
        title: string,
        text: string,
        link: string,
        img: string,
    };
}

export default function MainModuleComponent({children, data}: Props){


    return (
        <div className={'main-module'}>
            <h2 className={'header'}>{data.title}</h2>
            <div className={'body'}>
                <img className={'photo'} src={data.img}/>
                <div className={'text-content'}>{data.text}</div>
            </div>
        </div>
    )
}
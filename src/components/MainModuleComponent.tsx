import React, {ReactNode} from 'react';
import './MainModuleComponent.scss';

interface Props{
    children?: ReactNode;
    data: {
        id: number,
        title: string,
        description: string,
        photo: string,
    };
}

export default function MainModuleComponent({children, data}: Props){



    return (
        <div className={'main-module'}>
            <h2 className={'header'}>{data.title}</h2>
            <div className={'body'}>
                <img className={'photo'} src={require('../images/news.webp')}/>
                <div className={'text-content'}>{data.description}</div>
            </div>
        </div>
    )
}
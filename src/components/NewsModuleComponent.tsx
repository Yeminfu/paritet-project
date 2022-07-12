import React, {ReactNode} from 'react';
import './NewsModuleComponent.scss';

interface Props{
    children?: ReactNode;
    index: number;
    title: string;
    content: string;
    photo?: string;
}

export default function NewsModuleComponent({children, index, title, content, photo}: Props){



    return (
        <div className={'news-module'} style={{backgroundColor: index%2===0 ? '#ddd' : 'white'}}>
            <h2 className={'header'}>{title}</h2>
            <div className={'body'}>
                <div className={'photo'}> </div>
                <div className={'text-content'}>{content}</div>
            </div>
        </div>
    )
}
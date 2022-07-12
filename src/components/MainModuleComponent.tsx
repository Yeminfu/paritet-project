import React, {ReactNode} from 'react';
import './MainModuleComponent.scss';

interface Props{
    children?: ReactNode;
    title: string;
    content: string;
    photo?: string;
}

export default function MainModuleComponent({children, title, content, photo}: Props){



    return (
        <div className={'main-module'}>
            <h2 className={'header'}>{title}</h2>
            <div className={'body'}>
                <div className={'photo'}> </div>
                <div className={'text-content'}>{content}</div>
            </div>
        </div>
    )
}
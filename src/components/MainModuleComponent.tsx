import React, {ReactNode} from 'react';
import './MainModuleComponent.scss';
import {useNavigate} from "react-router-dom";

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

    const navigate = useNavigate()

    return (
        <div className={'main-module'} onClick={() => navigate(`..${data.link}`,{replace: true})}>
            <h2 className={'header'}>{data.title}</h2>
            <div className={'body'}>
                <div className='photo-wrapper'>
                    <img className={'photo'} src={data.img}/>
                </div>
                <div className={'text-content'}>{data.text}</div>
            </div>
        </div>
    )
}
import React, {ReactNode, useEffect} from 'react'
import PageComponent from "../pages/base/PageComponent";
import {useLocation} from 'react-router-dom';
import './NewsDetailsComponent.scss';

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


export default function NewsDetailsComponent({children, data}: Props){

    const location = useLocation();
    const state = location.state as any;

    return(
        <PageComponent>
            {[<div className={'news-details'} key={Math.random() + 1000000}>
                <div className={'news-header'}>
                    {state.title}
                </div>
                <div className={'news-date'}>
                    {state.publishDateTime}
                </div>
                <div className={'news-description'}>
                    {state.description}
                </div>
                <div className={'news-content'} dangerouslySetInnerHTML={{__html: state.blocks}}>

                </div>
            </div>]}
        </PageComponent>

    )
}
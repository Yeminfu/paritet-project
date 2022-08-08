import React, {ReactNode, useEffect} from 'react'
import PageComponent from "../pages/base/PageComponent";
import {useLocation} from 'react-router-dom';
import './NewsDetailsComponent.scss';
import DefaultTmp from "./DefaultTmp";
import NewsModuleComponent from "./NewsModuleComponent";
import Utils from "../lib/utils";
import AuthChecker from "./AuthChecker";

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

    const utils = new Utils()
    const location = useLocation();
    const state = location.state as any;

    useEffect(() => {
        console.log("ldd2", data)
    }, [])

    return(
            <DefaultTmp>
                {[<div className={'news-details'} key={Math.random() + 1000000} style={{maxWidth: '100%'}}>
                    <div className={'news-header'}>
                        {state.title}
                    </div>
                    <div className={'news-date'}>
                        {utils.formatDate(state.publishDateTime)}
                    </div>
                    <div className={'news-description'}>
                        {state.description}
                    </div>
                    <div className={'news-content'} dangerouslySetInnerHTML={{__html: state.blocks}}>

                    </div>
                </div>]}
            </DefaultTmp>
    )
}
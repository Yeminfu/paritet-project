import React, {ReactNode} from 'react';
import './MainModuleComponent.scss';
import {Link} from "react-router-dom";
import Utils from "../../lib/utils";
const slugger = require('slugify')

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

    const utils = new Utils()


    return (
        <Link className='main-link' to={`${data.link}`}>
            <div className={'main-module'}>
                    <div className={'header'}>
                            <div className={'header-text'}>
                                {data.title}
                            </div>
                    </div>
                {
                    children
                        ? <React.Fragment>
                            {children}
                    </React.Fragment>
                        :
                        <div className={'body'}>
                            <div className='photo-wrapper'>
                                <img className={'photo'} src={data.img}/>
                            </div>
                            <div className={'text-content'}>{data.text}</div>

                        </div>

                }
            </div>
        </Link>
    )
}
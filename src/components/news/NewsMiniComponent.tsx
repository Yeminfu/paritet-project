import React, {ReactNode} from "react";
import './NewsMiniComponent.scss'
import Utils from "../../lib/utils";
import {Link} from "react-router-dom";

interface Props{
    children?: ReactNode;
    data: {
        title: string,
        description: string,
        slug: string,
        dateTime: string,
        content: [],
    }
}

export default function NewsMiniComponent({children, data}: Props){

    const utils = new Utils()

    return(
        <Link to={'/news/'+data.slug} className='last-news-link'>
            <div className='news-mini-container'>
                <div className='news-mini-header'>
                    <div className='news-mini-date'>
                        {utils.formatDateShort(data.dateTime)}
                    </div>
                    <div className='news-mini-title'>
                        {data.title}
                    </div>
                </div>
                <div className='news-mini-body'>
                    <div className='news-mini-img'>
                       {/* <img src={data.smallImg}/>*/}
                    </div>
                    <div className='news-mini-description'>
                        {data.description}
                    </div>
                </div>
                {children}
            </div>
        </Link>

    )
}
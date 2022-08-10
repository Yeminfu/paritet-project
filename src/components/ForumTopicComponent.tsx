import React, {ReactNode} from 'react';
import './ForumTopicComponent.scss';
import {Link, useLocation} from "react-router-dom";

interface Props{
    children?: ReactNode;
    data: {
        id: number,
        title: string,
        description: string,
        slug: string,
    };
}


export default function ForumTopicComponent({children, data}: Props){

    const location = useLocation()

    return (
        <Link to={`..${location.pathname}/${data.slug}`}
              className='topic-link'
              style={{maxWidth: '100%'}}
              state={{topicId: data.id}}>
            <div className={'forum-topic-module'}>
                <div className={'header'}>
                    <div className={'category-title'}>{data.title}</div>
                </div>
                <div className={'body'}>
                    <div className={'icon-segment'}>
                        <div className={'icon'}>
                            <img src={process.env.PUBLIC_URL+'/assets/IconTopic.svg'}/>
                        </div>
                    </div>
                    <div className={'description-segment'}>{data.description}</div>
                </div>
            </div>
        </Link>

    )
}
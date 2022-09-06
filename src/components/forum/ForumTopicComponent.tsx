import React, {ReactNode, useEffect} from 'react';
import './ForumTopicComponent.scss';
import {Link} from "react-router-dom";
import Utils from "../../lib/utils";
import iconTopic from '../../assets/icons/IconTopic.svg'
import Fetcher from "../../Fetcher/Fetcher";
import iconViews from '../../assets/icons/IconViews.svg'
import iconChat from '../../assets/icons/IconChat.svg'

interface Props{
    children?: ReactNode;
    data: {
        id: number,
        username: number,
        title: string,
        description: string,
        slug: string,
        categorySlug: string,
        createdAt: string,
        views: number,
        messagesCount: number,
        lastCreatedAt: string,
        lastUsername: string,
    };
}


export default function ForumTopicComponent({children, data}: Props){

    const utils = new Utils()
    const fetcher = new Fetcher()



    return (
        <Link to={`/forum/${data.categorySlug}/${data.slug}`}
              className='topic-link'
              onClick={async () => await fetcher.incrementForumTopicViews(data.id)}
              style={{maxWidth: '100%'}}
              state={{topicId: data.id}}>
            <div className='forum-topic-module'>
                <div className='header'>
                    <div className='category-title'>{data.title}</div>
                    <div className='category-data'>
                        <div className='category-created-at'>{utils.formatDateWithoutTimeZone(data.createdAt)}</div>
                        <div className='category-creator'>{data.username}</div>
                    </div>
                </div>
                <div className='body'>
                    <div className='icon-segment'>
                        <div className='icon'>
                            <img src={iconTopic}/>
                        </div>
                    </div>
                    <div className='details-segment'>
                        <div className='statistic-segment'>
                            <div className='views'>
                                <img src={iconViews} className='details-icon' alt='' title='Просмотров'/>
                                {data.views}
                            </div>
                            <div className='messages'>
                                <img src={iconChat} className='details-icon' alt='' title='Ответов'/>
                                {data.messagesCount}
                            </div>
                        </div>
                        <div className='last-msg-segment'>
                            <div className='last-author'>
                                {utils.formatDateWithoutTimeZone(data.lastCreatedAt)}
                            </div>
                            <div className='last-date'>
                                {data.lastUsername}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>

    )
}
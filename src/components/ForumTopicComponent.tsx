import React, {ReactNode, useState} from 'react';
import './ForumTopicComponent.scss';
import Utils from "../lib/utils";
import {useStore} from "effector-react";
import {$username} from "../store/store";

interface Props{
    children?: ReactNode;
    data: {
        id: number,
        title: string,
        description: string,
        slug: string,
    };
    onItemClick: any;
}

export default function ForumTopicComponent({children, data, onItemClick}: Props){

    const [username, setUsername] = useState(useStore($username))
    const utils = new Utils()

    return (
        <div className={'forum-category-module'} onClick={() => onItemClick(data.id, data.slug)}>
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
    )
}
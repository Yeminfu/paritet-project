import React, {ReactNode, useState} from 'react';
import './ForumCategoryComponent.scss';
import Utils from "../lib/utils";
import {useStore} from "effector-react";

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

export default function ForumCategoryComponent({children, data, onItemClick}: Props){

    const [username, setUsername] = useState(useStore($username))
    const utils = new Utils()

    return (
        <div className={'forum-category-module'} onClick={() => onItemClick(data)}>
            <div className={'header'}>
                <div className={'category-title'}>{data.title}</div>
            </div>
            <div className={'body'}>
                <div className={'icon-segment'}>
                    <div className={'icon'}>
                        <img src={process.env.PUBLIC_URL+'/assets/IconCategory.svg'}/>
                    </div>
                </div>
                <div className={'description-segment'}>{data.description}</div>
            </div>
        </div>
    )
}
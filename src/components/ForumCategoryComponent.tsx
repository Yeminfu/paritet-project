import React, {ReactNode} from 'react';
import './ForumCategoryComponent.scss';
import Utils from "../lib/utils";
import {useNavigate} from "react-router-dom";
import Fetcher from "../Fetcher/Fetcher";
import {setCurrentForumCategory} from "../store/store";

interface Props{
    children?: ReactNode;
    data: {
        id: number,
        title: string,
        description: string,
        slug: string,
    };
}

export default function ForumCategoryComponent({children, data}: Props){

    const fetcher = new Fetcher()
    const navigate = useNavigate()

    const onItemClick = async (category: any) => {
        setCurrentForumCategory(category.id)
        localStorage.setItem('currentForumCategory', category.id)
        const response = await fetcher.getForumCategoriesByParentId(category.id)
        navigate(`../forum/${category.slug}`,{replace: true})
    }

    return (
        <div className={'forum-category-module'} style={{maxWidth: '100%'}}
             onClick={() => onItemClick(data)}>
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
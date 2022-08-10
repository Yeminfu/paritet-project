import React, {ReactNode} from 'react';
import './ForumCategoryComponent.scss';
import {Link} from "react-router-dom";

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

    return (
        <Link to={`../forum/${data.slug}`}
              className='forum-category-link'
              style={{maxWidth: '100%'}}
              state={{categoryId: data.id}}>
            <div className={'forum-category-module'}>
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
        </Link>
    )
}
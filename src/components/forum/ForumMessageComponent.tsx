import React, {ReactNode, useEffect} from 'react';
import './ForumMessageComponent.scss';
import Utils from "../../lib/utils";
import iconEdit from '../../assets/icons/IconEdit.svg'
import iconUser from "../../assets/icons/IconUser.svg";

interface Props{
    children?: ReactNode;
    data: {
        id: number,
        topicId: number,
        message: string,
        createdAt: string,
        date: string,

        userId: number,
        username: string
    };
    onEditClick: any;
}

export default function ForumMessageComponent({children, data, onEditClick}: Props){

    const userId = parseInt(String(localStorage.getItem('id')))
    const utils = new Utils()

    useEffect(() => {
        //console.log("msgs", data)
    })


    //authorId: 1
    //topicSlug: "kategoriya_foruma_nomer_1"
    //id: 1
    //password: "000000"
    //slug: "111"
    //title: "111"
    //token: "vvhZvFetKdwPh5RlRvG2"
    //tokenUpdate: "2022-08-10T02:05:01.000Z"
    //username: "superuser"


    return (
        <div className={'forum-message-module'} style={{maxWidth: '100%'}}>
            <div className={'header'}>
                <div className={'user-header-data'}>
                    <div className={'avatar'}>{data.username.substring(0,1).toUpperCase()}</div>
                    <div className={'username'}>{data.username}</div>
                </div>
                <div className={'message-header-data'}>
                    {
                        data.userId === userId && localStorage.getItem('username')
                        && (<div className={'edit-button'} onClick={onEditClick}>
                            <img src={iconEdit}/>
                          </div>)
                    }
                    <div className={'post-date'}>{utils.formatDateWithoutTimeZone(data.createdAt.toString())}</div>
                </div>
            </div>
            <div className={'body'}>
                <div className={'text-content'}>{data.message}</div>
            </div>
        </div>
    )
}
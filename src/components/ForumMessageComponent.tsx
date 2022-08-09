import React, {ReactNode, useEffect, useState} from 'react';
import './ForumMessageComponent.scss';
import Utils from "../lib/utils";
import {$auth} from "../store/store";

interface Props{
    children?: ReactNode;
    data: {
        id: number,
        userId: number,
        topicId: number,
        message: string,
        createdBy: string,
        date: string,
    };
    onEditClick: any;
}
interface AuthData {
    token: string;
    user: {
        id?: number;
        username: string;
    }
}
export default function ForumMessageComponent({children, data, onEditClick}: Props){

    const [userId, setUserId] = useState(parseInt(String(localStorage.getItem('userId'))))
    const [auth, setAuth] = useState($auth)
    const utils = new Utils()

    useEffect(() => {
        auth.map(e => {
            console.log("EEEEE", e)
        })
    }, [])

    return (
        <div className={'forum-message-module'} style={{maxWidth: '100%'}}>
            <div className={'header'}>
                <div className={'user-header-data'}>
                    <div className={'avatar'}>{'username'.substring(0,1).toUpperCase()}</div>
                    <div className={'username'}>{'username'}</div>
                </div>
                <div className={'message-header-data'}>
                    {data.userId === userId
                        ? <div className={'edit-button'} onClick={onEditClick}>
                              <img src={process.env.PUBLIC_URL + '/assets/IconEdit.svg'} alt={''}/>
                          </div>
                        : null}
                    <div className={'post-date'}>{utils.formatDateWithoutTimeZone(data.date.toString())}</div>
                </div>
            </div>
            <div className={'body'}>
                <div className={'text-content'}>{data.message}</div>
            </div>
        </div>
    )
}
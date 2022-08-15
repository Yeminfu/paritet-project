import React, {ReactNode, useEffect, useState} from 'react'
import '../MainPage/MainPage.scss'
import Fetcher from "../../Fetcher/Fetcher";
import FloatButtonComponent from "../../components/buttons/FloatButtonComponent";
import NewMessageModalComponent from "../../components/modals/NewMessageModalComponent";
import Utils from "../../lib/utils";
import ForumMessageComponent from "../../components/forum/ForumMessageComponent";
import DefaultTmp from "../../components/base/DefaultTmp";
import {useLocation} from "react-router-dom";

interface Props{
    children?: ReactNode;
}


export default function ForumMessagesPage({children}: Props){

    const [messages, setMessages] = useState<any[]>([])
    const [visibility, setVisibility] = useState(false)
    const [msgID, setMsgID] = useState(0)
    const [modalTitle, setModalTitle] = useState('Новое сообщение')
    const [initialModalMsg, setInitialModalMsg] = useState('')

    let fetcher = new Fetcher()
    const utils = new Utils()
    const location = useLocation();

    useEffect(() => {
        async function loadMessages(){
            try{
                //const state = location.state as any;
                let url = location.pathname.split('/', 10)
                console.log("PATHHH", url[url.length-1])
                const response = await fetcher.getForumMessages(url[url.length-1])
                console.log("PATHHH", response.data)
                setMessages(response.data)
            }
            catch{

            }
        }
        loadMessages();
    }, [visibility]);

    const onFloatClicked = () => {
        setVisibility(true)
        setInitialModalMsg('')
        setModalTitle('Новое сообщение')
        setMsgID(0)
    }

    const onModalClosed = () => {
        console.log("CLOSE")
        setVisibility(false)
        setInitialModalMsg('')
        setModalTitle('Новое сообщение')
    }

    const onModalAccepted = async (data: string, id?: number) => {
        setVisibility(false)

        if(data.length === 0){
            console.log("EMPTY MSG!")
        }
        else if(data.length > 0){
            const date = utils.formatDateForDB(new Date())
            let url = location.pathname.split('/', 10)
            const slug = url[url.length-1]

            id
                ? await fetcher.editMessage(msgID, data)
                : await fetcher.setNewForumMessage({
                    message: data,
                    createdAt: date,
                    authorId: parseInt(String(localStorage.getItem('id'))),
                    topicSlug: slug
                })
            const response = await fetcher.getForumMessages(slug)
            setMessages(response)
            //const response = await fetcher.getForumMessagesByTopicId(topicId)
            //setMessages(response.data)
        }

        setInitialModalMsg('')
    }

    const onEditClicked = (msg: string, id: number) => {
        setModalTitle('Редактирование сообщения')
        console.log("EDIT MSG", msg)
        setInitialModalMsg(msg)
        setMsgID(id)
        setVisibility(true)
    }



    return(
            <DefaultTmp>
                {
                    messages?.map(function(e, index){
                        return <ForumMessageComponent key={index+Math.random()+2000000}
                                                      data={e}
                                                      onEditClick={() => onEditClicked(e.message, e.authorId)}/>
                    })
                }
                {
                    visibility === true
                        ? <NewMessageModalComponent
                            msgID={msgID}
                            title={modalTitle}
                            placeholder={'Текст сообщения'}
                            initialMsg={initialModalMsg}
                            onClose={onModalClosed}
                            onAccept={onModalAccepted}/>
                        : null
                }
                <FloatButtonComponent clicked={onFloatClicked}
                                      title={'Новое сообщение'}
                                      color={'mediumseagreen'}
                                      icon={'/assets/IconMessage.svg'}/>
            </DefaultTmp>
    )
}
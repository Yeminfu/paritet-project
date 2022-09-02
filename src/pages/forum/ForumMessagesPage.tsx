import React, {ReactNode, useEffect, useState} from 'react'
import Fetcher from "../../Fetcher/Fetcher";
import FloatButtonComponent from "../../components/buttons/FloatButtonComponent";
import NewMessageModalComponent from "../../components/modals/NewMessageModalComponent";
import Utils from "../../lib/utils";
import ForumMessageComponent from "../../components/forum/ForumMessageComponent";
import DefaultTmp from "../../components/base/DefaultTmp";
import {useLocation} from "react-router-dom";
import PreloaderComponent from "../../components/common/PreloaderComponent";
import iconMessage from '../../assets/icons/IconMessage.svg'

interface Props{
    children?: ReactNode;
}


export default function ForumMessagesPage({children}: Props){

    const [messages, setMessages] = useState<any[]>([])
    const [visibility, setVisibility] = useState(false)
    const [msgID, setMsgID] = useState(0)
    const [modalTitle, setModalTitle] = useState('Новое сообщение')
    const [initialModalMsg, setInitialModalMsg] = useState('')
    const [isLoaded, setIsLoaded] = useState(true)

    let fetcher = new Fetcher()
    const utils = new Utils()
    const location = useLocation();

    useEffect(() => {
        setIsLoaded(true)
        async function loadMessages(){
            let url = location.pathname.split('/', 10)
            console.log("PATHHH", url[url.length-1])
            const response = await fetcher.getForumMessages(url[url.length-1])
            console.log("DATA EFFECT", response.data)
            setMessages(response.data)
            setIsLoaded(false)
        }
        loadMessages();
    }, []);

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
        setInitialModalMsg('')

        if(data.length === 0){
            console.log("EMPTY MSG!")
        }
        else if(data.length > 0){
            const date = utils.formatDateForDB(new Date())
            let url = location.pathname.split('/', 10)
            const slug = url[url.length-1]
            let f = null
            id  ? await fetcher.editForumMessage(msgID, data)
                : f = await fetcher.setNewForumMessage({
                    message: data,
                    createdAt: date,
                    userId: parseInt(String(localStorage.getItem('id'))),
                    topicSlug: slug
                })
            console.log("f", f)
            if(f !== null){
                console.log("NOT NULL")
                await fetcher.setForumTopicMsgCount(slug)
            }
        }



        let url = location.pathname.split('/', 10)
        console.log("PATHHH", url[url.length-1])
        const response = await fetcher.getForumMessages(url[url.length-1])
        console.log("DATA EFFECT", response.data)
        setMessages(response.data)
        setIsLoaded(false);
        console.log("document.body.clientHeight", document.body.clientHeight)
        console.log("document.body.offsetHeight", document.body.offsetHeight)
        window.scrollTo(0, 999999)
    }

    const onEditClicked = (msg: string, id: number) => {
        setModalTitle('Редактирование сообщения')
        console.log("EDIT MSG", msg)
        setInitialModalMsg(msg)
        setMsgID(id)
        setVisibility(true)
    }



    return(
        isLoaded
            ? <PreloaderComponent/>
            : <DefaultTmp>
                {
                    messages?.map(function(e, index){
                        return <ForumMessageComponent key={index+Math.random()+2000000}
                                                      data={e}
                                                      onEditClick={() => onEditClicked(e.message, e.id)}/>
                    })
                }
                {
                    visibility
                        ? <NewMessageModalComponent
                            msgID={msgID}
                            title={modalTitle}
                            placeholder={'Текст сообщения'}
                            initialMsg={initialModalMsg}
                            onClose={onModalClosed}
                            onAccept={onModalAccepted}/>
                        : null
                }
                {
                    localStorage.getItem('username')
                        ? <FloatButtonComponent clicked={onFloatClicked}
                                          title={'Новое сообщение'}
                                          color={'mediumseagreen'}
                                          icon={iconMessage}/>
                        : null

                }
            </DefaultTmp>
    )
}
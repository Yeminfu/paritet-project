import React, {ReactNode, useEffect, useState} from 'react'
import './MainPage.scss'
import Fetcher from "../Fetcher/Fetcher";
import PageComponent from "./base/PageComponent";
import FloatButtonComponent from "../components/buttons/FloatButtonComponent";
import NewMessageModalComponent from "../components/modals/NewMessageModalComponent";
import Utils from "../lib/utils";
import ForumMessageComponent from "../components/ForumMessageComponent";
import {$currentForumTopic} from "../store/store";

interface Props{
    children?: ReactNode;
}

const onSearch = (value: string) => console.log(value)

export default function ForumMessagesPage({children}: Props){

    const [messages, setMessages] = useState<any[]>([])
    const [visibility, setVisibility] = useState(false)
    const [msgID, setMsgID] = useState(0)
    const [initialModalMsg, setInitialModalMsg] = useState('')

    let fetcher = new Fetcher()
    let isModal = false
    const utils = new Utils()

    useEffect(() => {
        async function loadMessages(){
            try{
                const response = await fetcher.getForumMessagesByTopicId(parseInt(String(localStorage.getItem('currentForumTopic'))))
                setMessages(response.data)
            }
            catch{

            }
        }
        loadMessages();
        console.log("USEEFFECT", messages)
    }, []);

    const onFloatClicked = () => {
        setVisibility(true)
        setInitialModalMsg('')
        setMsgID(0)
    }

    const onModalClosed = () => {
        setVisibility(false)
        setInitialModalMsg('')
    }

    const onModalAccepted = async (data: string, id?: number) => {
        setVisibility(false)

        if(data.length === 0){
            console.log("EMPTY MSG!")
        }
        else if(data.length > 0){
            const date = utils.formatDateForDB(new Date())
            console.log("MSG PAGE CUR TOPIC ID:", parseInt(String(localStorage.getItem('currentForumTopic'))))

            const topicId = parseInt(String(localStorage.getItem('currentForumTopic')))

            id
                ? await fetcher.editMessage(id, data)
                : await fetcher.setNewMessage({
                    userId: parseInt(String(localStorage.getItem('userId'))),
                    topicId: topicId,
                    message: data,
                    createdBy: date,
                    date: date
                })

            const response = await fetcher.getForumMessagesByTopicId(topicId)
            setMessages(response.data)
        }

        setInitialModalMsg('')
    }

    const onEditClicked = (msg: string, id: number) => {
        setVisibility(true)
        console.log("EDIT MSG", msg)
        setInitialModalMsg(msg)
        setMsgID(id)
    }

    const getData = messages?.map(function(e, index){
        return <ForumMessageComponent key={index+Math.random()+2000000}
            data={e}
            onEditClick={() => onEditClicked(e?.message, e.id)}/>
    })

    return(
        <PageComponent isWrap={false}
            floatButton={<FloatButtonComponent clicked={onFloatClicked}
                                               title={'Новое сообщение'}
                                               color={'mediumseagreen'}
                                               icon={'/assets/IconMessage.svg'}/>}
            modal={visibility
                ? <NewMessageModalComponent
                    msgID={msgID}
                    title={'Новое сообщение'}
                    placeholder={'Текст сообщения'}
                    initialMsg={initialModalMsg}
                    onClose={onModalClosed}
                    onAccept={onModalAccepted}/>
                : null}>
            { [getData] }
        </PageComponent>
    )
}
import React, {ReactNode, useEffect, useState} from 'react'
import './MainPage/MainPage.scss'
import Fetcher from "../Fetcher/Fetcher";
import FloatButtonComponent from "../components/buttons/FloatButtonComponent";
import NewMessageModalComponent from "../components/modals/NewMessageModalComponent";
import Utils from "../lib/utils";
import ForumMessageComponent from "../components/ForumMessageComponent";
import DefaultTmp from "../components/DefaultTmp";
import AuthChecker from "../components/AuthChecker";

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

    useEffect(() => {
        async function loadMessages(){
            try{
                const response = await fetcher.getForumMessagesByTopicId(parseInt(String(localStorage.getItem('currentForumTopic'))))
                console.log("dtaaa", response.data)
                setMessages(response.data)
            }
            catch{

            }
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
                                                      onEditClick={() => onEditClicked(e?.message, e.id)}/>
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
                <FloatButtonComponent clicked={onFloatClicked}
                                      title={'Новое сообщение'}
                                      color={'mediumseagreen'}
                                      icon={'/assets/IconMessage.svg'}/>
            </DefaultTmp>
    )
}
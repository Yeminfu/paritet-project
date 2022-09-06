import React, {ReactNode, useEffect, useState} from 'react'
import Fetcher from "../../Fetcher/Fetcher";
import ForumTopicComponent from "../../components/forum/ForumTopicComponent";
import FloatButtonComponent from "../../components/buttons/FloatButtonComponent";
import NewTopicModalComponent from "../../components/modals/NewTopicModalComponent";
import Utils from "../../lib/utils";
import slugify from "slugify";
import {useLocation} from "react-router-dom";
import DefaultTmp from "../../components/base/DefaultTmp";
import {$auth, $forumTopicsCoords, setBreadCrumbs, setForumTopicsCoords} from "../../store/store";
import PreloaderComponent from "../../components/common/PreloaderComponent";
import iconTopic from '../../assets/icons/IconNewTopic.svg'


interface Props{
    children?: ReactNode;
}


export default function ForumTopicsPage({}: Props){

    const [topics, setTopics] = useState<any[]>([])
    const [visibility, setVisibility] = useState(false)
    const [msgID, setMsgID] = useState(0)
    const [initialModalMsg, setInitialModalMsg] = useState('')
    const [isLoaded, setIsLoaded] = useState(true)

    const location = useLocation();

    let fetcher = new Fetcher()
    const utils = new Utils()

    useEffect(() => {
        setIsLoaded(true)
        //const utils = new Utils()
        //utils.getBreadCrumbs(location.pathname)
        setBreadCrumbs(['Главная', 'Форум'])
        async function loadTopics(){
            let url = location.pathname.split('/', 10)
            const response = await fetcher.getForumTopics(url[url.length-1])
            setTopics(response.data)
            setIsLoaded(false)
            setTimeout(() => {
                window.scroll(0, $forumTopicsCoords.getState())
            }, 0)
        }
        loadTopics();
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

    const onModalAccepted = async (title: string, message: string, id?: number) => {
        setVisibility(false)
        setInitialModalMsg('')

        const userId = parseInt(String(localStorage.getItem('id')))

        let url = location.pathname.split('/', 10)
        const categorySlug = url[url.length-1]
        const slug = slugify(title)
        const date = utils.formatDateForDB(new Date())
        const username = $auth.getState()?.user.username.toString()
        const data = {title, slug, userId, categorySlug, message, date, username}

        await fetcher.setNewForumTopic(data)

        //const dataMsg = {
        //    message: message,
        //    createdAt: utils.formatDateForDB(new Date()),
        //    userId: userId,
        //    topicSlug: slug
        //}
        //await fetcher.setNewForumMessage(dataMsg)
        //console.log("setNewForumMessage: ok")
        await fetcher.setForumTopicMsgCount(slug)
        console.log("setForumTopicMsgCount: ok")

        const response = await fetcher.getForumTopics(url[url.length-1])
        console.log("getForumTopics: ok")
        console.log("check data", response.data)
        setTopics(response.data)
        setTimeout(() => {
            window.scroll(0, 0)
        }, 0)
    }



    return(
        isLoaded
            ? <PreloaderComponent/>
            : <DefaultTmp getScroll={(data: number) => {setForumTopicsCoords(data)}}>
                {
                    topics?.map(function(e, index){
                        return <ForumTopicComponent
                            data={e}
                            key={index+Math.random()+2000000}/>
                    })
                }
                {
                    visibility
                        ? <NewTopicModalComponent
                            user={localStorage.getItem('username')}
                            msgID={msgID}
                            title={'Новая тема'}
                            firstPlaceholder={'Заголовок'}
                            secondPlaceholder={'Текст сообщения'}
                            initialMsg={initialModalMsg}
                            onClose={onModalClosed}
                            onAccept={onModalAccepted}/>
                        : null
                }
                {
                    localStorage.getItem('username')
                        && (<FloatButtonComponent clicked={onFloatClicked}
                                          title={'Новая тема'}
                                          color={'lightblue'}
                                          icon={iconTopic}/>)
                }
            </DefaultTmp>
    )
}
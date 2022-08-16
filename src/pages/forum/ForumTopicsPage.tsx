import React, {ReactNode, useEffect, useState} from 'react'
import Fetcher from "../../Fetcher/Fetcher";
import ForumTopicComponent from "../../components/forum/ForumTopicComponent";
import FloatButtonComponent from "../../components/buttons/FloatButtonComponent";
import NewTopicModalComponent from "../../components/modals/NewTopicModalComponent";
import Utils from "../../lib/utils";
import slugify from "slugify";
import {useLocation} from "react-router-dom";
import DefaultTmp from "../../components/base/DefaultTmp";
import {setBreadCrumbs} from "../../store/store";


interface Props{
    children?: ReactNode;
}


export default function ForumTopicsPage({}: Props){

    const [topics, setTopics] = useState<any[]>([])
    const [visibility, setVisibility] = useState(false)
    const [msgID, setMsgID] = useState(0)
    const [initialModalMsg, setInitialModalMsg] = useState('')

    const location = useLocation();

    let fetcher = new Fetcher()
    const utils = new Utils()

    useEffect(() => {
        //const utils = new Utils()
        //utils.getBreadCrumbs(location.pathname)
        setBreadCrumbs(['Главная', 'Форум'])
        async function loadTopics(){
            try{
                let url = location.pathname.split('/', 10)
                const response = await fetcher.getForumTopics(url[url.length-1])
                setTopics(response.data)
            }
            catch{

            }
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

        const authorId = parseInt(String(localStorage.getItem('id')))

        let url = location.pathname.split('/', 10)
        const categorySlug = url[url.length-1]
        const slug = slugify(title)
        const date = utils.formatDateForDB(new Date())
        const data = {title, slug, authorId, categorySlug, message, date}

        console.log("TITLE:", title)
        console.log("SLUG:", slug)
        console.log("MSG:", message)
        console.log("USER_ID:", authorId)
        console.log("CATEGORY_SLUG:", categorySlug)

        await fetcher.setNewForumTopic(data)

        const dataMsg = {
            message: message,
            createdAt: utils.formatDateForDB(new Date()),
            authorId: authorId,
            topicSlug: slug
        }
        await fetcher.setNewForumMessage(dataMsg)
        const response = await fetcher.getForumTopics(categorySlug)
        //message, createdAt, authorId, topicSlug

        console.log("GET TOPICS BY SLUG ("+categorySlug+"):", response)

        setTopics(response)
        setInitialModalMsg('')
    }



    return(
            <DefaultTmp>
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
                        ? <FloatButtonComponent clicked={onFloatClicked}
                                          title={'Новая тема'}
                                          color={'lightblue'}
                                          icon={'/assets/IconNewTopic.svg'}/>
                        : null
                }
            </DefaultTmp>
    )
}
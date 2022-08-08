import React, {ReactNode, useEffect, useState} from 'react'
import './MainPage/MainPage.scss'
import Fetcher from "../Fetcher/Fetcher";
import ForumTopicComponent from "../components/ForumTopicComponent";
import PageComponent from "./base/PageComponent";
import FloatButtonComponent from "../components/buttons/FloatButtonComponent";
import NewTopicModalComponent from "../components/modals/NewTopicModalComponent";
import Utils from "../lib/utils";
import slugify from "slugify";
import {useLocation, useNavigate} from "react-router-dom";
import {setCurrentForumTopic} from "../store/store";
import DefaultTmp from "../components/DefaultTmp";
import ForumCategoryComponent from "../components/ForumCategoryComponent";
import AuthChecker from "../components/AuthChecker";

interface Props{
    children?: ReactNode;
}


export default function ForumTopicsPage({}: Props){

    const [topics, setTopics] = useState<any[]>([])
    const [visibility, setVisibility] = useState(false)
    const [msgID, setMsgID] = useState(0)
    const [initialModalMsg, setInitialModalMsg] = useState('')

    const navigate = useNavigate()
    const location = useLocation();

    let fetcher = new Fetcher()
    const utils = new Utils()

    useEffect(() => {
        async function loadTopics(){
            try{
                const response = await fetcher.getTopicsByCategoryId(parseInt(String(localStorage.getItem('currentForumCategory'))))
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

        const authorId = parseInt(String(localStorage.getItem('userId')))
        const categoryId = parseInt(String(localStorage.getItem('currentForumCategory')))
        const slug = slugify(title)
        const date = utils.formatDateForDB(new Date())
        const data = {title, slug, authorId, categoryId, message, date}

        console.log("TITLE:", title)
        console.log("SLUG:", slug)
        console.log("MSG:", message)
        console.log("USER_ID:", authorId)
        console.log("CATEGORY_ID:", categoryId)

        await fetcher.setNewForumTopic(data)
        const response = await fetcher.getTopicsByCategoryId(categoryId)
        console.log("GET TOPICS BY ID ("+categoryId+"):", response)
        setTopics(response.data)

        //console.log("TITLE:", title)
        //if(data.length === 0){
        //    console.log("EMPTY MSG!")
        //}
        //else if(data.length > 0){
        //    const date = utils.formatDateForDB(new Date())
        //    id
        //        ? await fetcher.editTopic(id, data)
        //        : await fetcher.setNewTopic({user: username, topic: data, createdBy: date, date: date})
        //    const response = await fetcher.getTopics()
        //    setTopics(response.data)
        //}

        setInitialModalMsg('')
    }

    const onItemClicked = async (id: number, slug: string) => {
        console.log("CUR TOPIC ID:", id)
        navigate(`..${location.pathname}/${slug}`)
        localStorage.setItem('currentForumTopic', String(id))
        setCurrentForumTopic(String(id))
    }



    return(
            <DefaultTmp>
                {
                    topics?.map(function(e, index){
                        return <ForumTopicComponent
                            data={e}
                            key={index+Math.random()+2000000}
                            onItemClick={() => onItemClicked(e.id, e.slug)}/>
                    })
                }
                <FloatButtonComponent clicked={onFloatClicked}
                                      title={'Новая тема'}
                                      color={'lightblue'}
                                      icon={'/assets/IconNewTopic.svg'}/>
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
            </DefaultTmp>
    )
}
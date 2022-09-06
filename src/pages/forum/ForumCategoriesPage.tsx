import React, {ReactNode, useEffect, useState} from 'react'
import Fetcher from "../../Fetcher/Fetcher";
import ForumCategoryComponent from "../../components/forum/ForumCategoryComponent";
import DefaultTmp from "../../components/base/DefaultTmp";
import Utils from "../../lib/utils";
import { useLocation } from 'react-router-dom';
import {$forumCatsCoords, $mainCoords, setBreadCrumbs, setForumCatsCoords} from "../../store/store";
import ForumTopicComponent from "../../components/forum/ForumTopicComponent";
import './ForumCategoriesPage.scss'
import PreloaderComponent from "../../components/common/PreloaderComponent";

interface Props{
    children?: ReactNode;
}

export default function ForumCategoriesPage({children}: Props){

    const [lastTopics, setLastTopics] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [isLoaded, setIsLoaded] = useState(true)

    const fetcher = new Fetcher()
    const location = useLocation()


    useEffect(() => {
        setIsLoaded(true)
        //const utils = new Utils()
        //utils.getBreadCrumbs(location.pathname)
        setBreadCrumbs(['Главная', 'Форум'])

        async function getLastTopics(){
            let url = location.pathname.split('/', 10)
            const response = await fetcher.getLastForumTopics(url[url.length-1])
            console.log("PATHHH", response.data)
            setLastTopics(response.data)
        }
        getLastTopics()

        async function getCategories(){
            const response = await fetcher.getForumCategories()
            setCategories(response)
            setIsLoaded(false)
            setTimeout(() => {
                window.scroll(0, $forumCatsCoords.getState())
            }, 0)
        }
        getCategories()
    }, []);


    return(
        isLoaded
            ? <PreloaderComponent/>
            : <DefaultTmp getScroll={(data: number) => {setForumCatsCoords(data)}}>
                <React.Fragment>
                    {
                        lastTopics.length > 0 && (<div className='list-container'>
                            <div className='list-header'>
                                Новые темы на форуме
                            </div>
                            {
                                lastTopics?.map(function(e,index){
                                    return <ForumTopicComponent
                                        data={e}
                                        key={index+Math.random()+2000000}>
                                    </ForumTopicComponent>
                                })
                            }
                        </div>)
                    }
                    {
                        <div className='list-container'>
                            <div className='list-header'>
                                Категории
                            </div>
                            {
                                categories?.map(function(e, index){
                                    return <ForumCategoryComponent
                                        data={e}
                                        key={index+Math.random()+2000000}>
                                    </ForumCategoryComponent>
                                })
                            }
                        </div>
                    }
                </React.Fragment>
            </DefaultTmp>
    )
}
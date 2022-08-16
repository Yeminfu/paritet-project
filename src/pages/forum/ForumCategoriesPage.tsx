import React, {ReactNode, useEffect, useState} from 'react'
import Fetcher from "../../Fetcher/Fetcher";
import ForumCategoryComponent from "../../components/forum/ForumCategoryComponent";
import DefaultTmp from "../../components/base/DefaultTmp";
import Utils from "../../lib/utils";
import { useLocation } from 'react-router-dom';
import {setBreadCrumbs} from "../../store/store";

interface Props{
    children?: ReactNode;
}

export default function ForumCategoriesPage({children}: Props){

    const [categories, setCategories] = useState<any[]>([])

    const fetcher = new Fetcher()
    const location = useLocation()


    useEffect(() => {
        //const utils = new Utils()
        //utils.getBreadCrumbs(location.pathname)
        setBreadCrumbs(['Главная', 'Форум'])
        async function getCategories(){
            const response = await fetcher.getForumCategories()
            setCategories(response)
        }
        getCategories()
    }, []);


    return(
            <DefaultTmp>
                {
                    categories?.map(function(e, index){
                        return <ForumCategoryComponent
                            data={e}
                            key={index+Math.random()+2000000}>
                        </ForumCategoryComponent>
                    })
                }
            </DefaultTmp>
    )
}
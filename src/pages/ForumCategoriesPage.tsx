import React, {ReactNode, useEffect, useState} from 'react'
import './MainPage/MainPage.scss'
import Fetcher from "../Fetcher/Fetcher";
import ForumCategoryComponent from "../components/ForumCategoryComponent";
import DefaultTmp from "../components/DefaultTmp";
import AuthChecker from "../components/AuthChecker";

interface Props{
    children?: ReactNode;
}

export default function ForumCategoriesPage({children}: Props){

    const [categories, setCategories] = useState<any[]>([])

    const fetcher = new Fetcher()

    useEffect(() => {
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
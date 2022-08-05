import React, {ReactNode, useEffect, useState} from 'react'
import './MainPage/MainPage.scss'
import Fetcher from "../Fetcher/Fetcher";
import PageComponent from "./base/PageComponent";
import ForumCategoryComponent from "../components/ForumCategoryComponent";
import {useNavigate} from "react-router-dom";
import {setCurrentForumCategory} from "../store/store";

interface Props{
    children?: ReactNode;
}

const onSearch = (value: string) => console.log(value)

export default function ForumCategoriesPage({children}: Props){

    const [categories, setCategories] = useState<any[]>([])

    const navigate = useNavigate()

    let fetcher = new Fetcher()

    useEffect(() => {
        async function getCategories(){
            const response = await fetcher.getForumCategories()
            console.log("RESP_F", response)
            setCategories(response)
        }
        getCategories()
        console.log("USEEFFECT", categories)
    }, []);

    const categorySelected = async (category: any) => {
        setCurrentForumCategory(category.id)
        localStorage.setItem('currentForumCategory', category.id)
        //setCategories(response)
        const response = await fetcher.getForumCategoriesByParentId(category.id)
        navigate(`../forum/${category.slug}`)
    }

    const getData = categories?.map(function(e, index){
        return <ForumCategoryComponent
            data={e}
            onItemClick={categorySelected}
            key={index+Math.random()+2000000}>
        </ForumCategoryComponent>
    })

    return(
        <PageComponent isWrap={false}>
            { [getData] }
        </PageComponent>
    )
}
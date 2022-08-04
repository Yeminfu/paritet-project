import React, {ReactNode, useEffect, useState} from 'react'
import 'antd/dist/antd.min.css'
import './MainPage.scss'
import Search from "antd/es/input/Search";
import Fetcher from "../Fetcher/Fetcher";
import MainModuleComponent from "../components/MainModuleComponent";
import {Link, Route, Routes, useNavigate} from "react-router-dom";
import PageComponent from "./base/PageComponent";
import AuthPage from "./AuthPage";

interface Props{
    children?: ReactNode;
    user: any;
}

const onSearch = (value: string) => console.log(value)

export default function MainPage({children, user}: Props){

    const [categories, setCategories] = useState([])

    let fetcher = new Fetcher()

    useEffect(() => {
        async function loadCategories(){
            try{
                const response = await fetcher.getCategories()
                setCategories(response.data)
            } catch{

            }
        }
        loadCategories();
    }, []);

    function switchTo(index: number){
        console.log("switchTo", index)
        switch(index){
            case 1: return '/news'
            case 2: return '/forum'
            case 3: return '/programs'
            case 4: return '/projects'
            case 5: return '/jurisprudence'
            case 6: return '/hcs'
            case 7: return '/ads'
            case 8: return '/employment'
            case 9: return '/private-services'
            default: return ''
        }
    }

    const getData = categories?.map(function(e, index){
        return <Link to={switchTo(index+1)} key={index}>
            <MainModuleComponent data={e}/>
        </Link>

    })

    return(
        <PageComponent>
            { [getData] }
        </PageComponent>
    )
}
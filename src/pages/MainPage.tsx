import React, {ReactNode, useEffect, useState} from 'react'
import 'antd/dist/antd.min.css'
import './MainPage.scss'
import Search from "antd/es/input/Search";
import Fetcher from "../Fetcher/Fetcher";
import MainModuleComponent from "../components/MainModuleComponent";
import NewsModuleComponent from '../components/NewsModuleComponent';
import {Link, Route, Routes} from "react-router-dom";

interface Props{
    children?: ReactNode;
    user?: any;
    onLogOut: any;
}

const onSearch = (value: string) => console.log(value)

export default function MainPage({children, user, onLogOut}: Props){

    const controller = new Fetcher;
    let news = new Array();

    if(typeof user === 'string'){
        user = JSON.parse(user)
    }

    async function logOut(){
        await controller.logOut(user)
        onLogOut()
    }

    async function onNewsModuleClicked(){
        console.log("MY NEWS CLICKED")

        console.log("MY NEWS1:", news)
        news = await controller.getNews(5)
        console.log("THIS IS LIST", news)
    }

    function getNewsList(){
        console.log("IS LIST", news.length)
        if(news.length > 0){
            const list = news.map((e: any, idx: number)=>{
                return <NewsModuleComponent key={e.id} title={e.title} content={e.content} index={idx}/>
            })
            console.log("LLL", list)
            return(
                <div> list </div>
            )
        }
        else{
            return(
                <div>there is no elements in list</div>
            )
        }
    }


    let content = "Lorem Ipsum - это текст-\"рыба\", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной \"рыбой\" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum."


    return(
        <div className={'main-page'}>
            <div className={'main-header'}>
                Logo
                <Search className={'search-field'} placeholder={"Поиск..."} onSearch={onSearch} enterButton/>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className={'user-name-label'}>{user?.username}</div>
                    <button className={'button'}
                            type="submit"
                            onClick={logOut}>Выйти</button>
                </div>

            </div>
            <div className={'main-content'}>

                <Routes location={'/'}>
                    <Route path={'/'} element={
                        <div className={'modules-area'}>

                            <Link to={`/news`}>
                                <div className={'module'} style={{backgroundColor: "grey", width: '100%', minHeight: '300px', color: 'black'}}
                                     onClick={onNewsModuleClicked}>
                                    <MainModuleComponent title={'Политика/Новости'} content={content}> </MainModuleComponent>
                                </div>
                            </Link>

                            <div className={'module'} style={{backgroundColor: "darkgrey", width: '100%', minHeight: '300px'}}>
                                <MainModuleComponent title={'Муниципальные/Социальные программы'} content={content}> </MainModuleComponent>
                            </div>
                            <div className={'module'} style={{backgroundColor: "grey", width: '100%', minHeight: '300px'}}>
                                <MainModuleComponent title={'Проекты/Голосования'} content={content}> </MainModuleComponent>
                            </div>
                            <div className={'module'} style={{backgroundColor: "darkgrey", width: '100%', minHeight: '300px'}}>
                                <MainModuleComponent title={'Юриспруденция'} content={content}> </MainModuleComponent>
                            </div>
                            <div className={'module'} style={{backgroundColor: "grey", width: '100%', minHeight: '300px'}}>
                                <MainModuleComponent title={'ЖКХ'} content={content}> </MainModuleComponent>
                            </div>
                            <div className={'module'} style={{backgroundColor: "darkgrey", width: '100%', minHeight: '300px'}}>
                                <MainModuleComponent title={'Объявления'} content={content}> </MainModuleComponent>
                            </div>
                            <div className={'module'} style={{backgroundColor: "grey", width: '100%', minHeight: '300px'}}>
                                <MainModuleComponent title={'Трудоустройство'} content={content}> </MainModuleComponent>
                            </div>
                            <div className={'module'} style={{backgroundColor: "darkgrey", width: '100%', minHeight: '300px'}}>
                                <MainModuleComponent title={'Частные услуги'} content={content}> </MainModuleComponent>
                            </div>
                        </div>
                    }> </Route>
                    <Route path={'/news'} element={
                       <div> Здесь должны быть новости после нажатия на категорию политики и новостей </div>
                    }> </Route>
                </Routes>

                <div className={'main-footer'}>Контактные данные 89241237687</div>
            </div>
        </div>
    )
}
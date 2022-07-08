import React, {ReactNode} from 'react'
import 'antd/dist/antd.min.css'
import './MainPage.scss'
import Search from "antd/es/input/Search";
import AxiosController from "../AxiosController/AxiosController";

interface Props{
    children?: ReactNode;
    user?: any;
    onLogOut: any;
}

const onSearch = (value: string) => console.log(value)

export default function MainPage({children, user, onLogOut}: Props){

    const controller = new AxiosController;

    console.log("MAIN1", typeof user)
    console.log("MAIN2", Object(user))
    if(typeof user === 'string'){
        user = JSON.parse(user)
    }
    console.log(typeof user)
    console.log(user)

    async function logOut(){
        await controller.logOut(user)
        onLogOut()
    }

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
                <div className={'modules-area'}>
                    <div className={'module'} style={{backgroundColor: "grey", width: '100%', minHeight: '300px'}}> </div>
                    <div className={'module'} style={{backgroundColor: "darkgrey", width: '100%', minHeight: '300px'}}> </div>
                    <div className={'module'} style={{backgroundColor: "grey", width: '100%', minHeight: '300px'}}> </div>
                    <div className={'module'} style={{backgroundColor: "darkgrey", width: '100%', minHeight: '300px'}}> </div>
                    <div className={'module'} style={{backgroundColor: "grey", width: '100%', minHeight: '300px'}}> </div>
                </div>
                <div className={'main-footer'}>Контактные данные 89241237687</div>
            </div>
        </div>
    )
}
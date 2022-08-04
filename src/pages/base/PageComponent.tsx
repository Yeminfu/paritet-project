import React, {ReactNode, useState} from "react";
import { Col } from 'antd';
import Search from "antd/es/input/Search";
import {$authState, $username, setAuthState, setUsernameState} from "../../store/store";
import {useStore} from "effector-react";
import './PageComponent.scss';
import Fetcher from "../../Fetcher/Fetcher";
import {Link, Navigate, Route, useNavigate} from "react-router-dom";

interface Props{
    children?: [ReactNode];
    floatButton?: JSX.Element | null;
    modal?: JSX.Element | null;
    isWrap?: boolean;
}

const onSearch = (value: string) => console.log(value);

export default function PageComponent({children, floatButton, modal, isWrap = true}: Props){

    const [auth, setAuth] = useState(useStore($authState))
    const [username, setUsername] = useState(useStore($username))

    let fetcher = new Fetcher()
    let navigate = useNavigate()
    //console.log(auth)
    //console.log(user)

    const logOut = async () => {
        console.log("LOGOUT")
        await fetcher.logOut(username)
        setAuthState(null)
        setUsernameState(null)
        setAuth(null)
        setUsername(null)
        localStorage.setItem('auth', 'null')
        localStorage.setItem('username', 'null')

        return <Route
            path={'/login'}
            element={ <Navigate to='/login'/>} >
        </Route>
    }

    function getList(){
        //console.log("GETHCLD", children)
        return children?.map(e => e)
    }

    return(
        <Col className={'page'}>
            <Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>
            <div className={'content-area'}>
                <div className={'main-header'}>
                    <div className={'upper-header'}>
                        <div className={'user-name-label'}>{username}</div>
                        <div className={'exit-button-wrapper'}>
                            <Link to={'/login'}>
                                <button className={'button'}
                                        type="submit"
                                        onClick={logOut}>Выйти</button>
                            </Link>
                        </div>
                    </div>
                    <div className={'lower-header'}>
                        <div className={'logo-wrapper'} onClick={() => {navigate("../", { replace: true });}}>Паритет</div>
                        <Search className={'search-field'}
                                placeholder={"Поиск..."}
                                onSearch={onSearch} enterButton/>
                    </div>
                </div>
                <div className={'main-content'}>
                    <div className={'modules-area'} style={{'flexFlow': isWrap ? 'wrap' : 'none'}}>
                        {getList()}
                    </div>
                    <div className={'main-footer'}
                         style={{
                             position: children && (children.length < 2) ? 'static' : 'absolute',
                             bottom: children && (children.length < 2) ? 'none' : '0',
                         }}>Контактные данные 89241237687</div>
                </div>
                { floatButton }
            </div>
            <Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>
            { modal }
        </Col>
    )
}
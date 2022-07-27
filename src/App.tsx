import React, {useEffect, useState} from 'react';
import { useStore } from "effector-react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.scss';
import { Col } from 'antd';
import 'antd/dist/antd.min.css';
import {
    $authState, $token, $tokenExp, $username,
    //$userState,
    setAuthState, setTokenExpState, setTokenState, setUsernameState,
    //setUserState
} from "./store/store";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailsComponent from "./components/NewsDetailsComponent";
import RegPage from "./pages/RegPage";


//const history = require('connect-history-api-fallback');
//const connect = require('connect');
//const app = connect()
//    .use(history())
//    .listen(3000);

const onSearch = (value: string) => console.log(value);


function App() {
    const [auth, setAuth] = useState(useStore($authState))
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState(useStore($username))
    const [token, setToken] = useState(useStore($token))
    const [tokenExp, setTokenExp] = useState(useStore($tokenExp))
    let navigate = useNavigate();
    let isLogin = true
    console.log("APP auth:", auth)
    console.log("APP user:", username)
    //console.log("TOKEN:", new Date(user?.token_update) > new Date())



    const isAuthorized = () => {
        const currentDT = new Date()
        return !(auth === null || auth === 'null')
            && username
            && token
            && (tokenExp ? new Date(tokenExp) > currentDT : false)
            /* || user === null || user === 'null' && user ? new Date(user?.token_update) > new Date() : false*/
    }

    const onAuthState = (state: any, user?: any) => {
        console.log("onAuthState catched!!!", state, user)
        if(state){
            setUser(user)
            setAuth(state)
            //localStorage.setItem('user', JSON.stringify(user))
            setUsernameState(user.username)
            setTokenState(user.token)
            setTokenExpState(user.token_update.toString())
            setUsername(user.username)
            setToken(user.token)
            setTokenExp(user.token_update.toString())
            setAuthState(state)

            localStorage.setItem('auth', state)
            localStorage.setItem('username', user.username)
            localStorage.setItem('token', user.token)
            localStorage.setItem('tokenExp', user.token_update.toString())

            navigate("../", { replace: true });
            return
        }
        setAuth(state)
        setAuthState(state)
        localStorage.setItem('auth', state)
        navigate("../login", { replace: true });
    }

    //const onLogOut = () => {
    //    console.log("logOut catched!!!", user)
    //    setAuthState(null)
    //    setUserState(null)
    //    setAuth(null)
    //    setUser(null)
    //    localStorage.setItem('auth', 'null')
    //    localStorage.setItem('user', 'null')
    //}

    return (
        <Col className="App">
            <Routes>
                    <Route path={'/registration'} element={<RegPage onReg={onAuthState}/>}> </Route>
                    <Route path={'/login'} element={<AuthPage onAuth={onAuthState}/>}> </Route>
                    <Route path={'/'} element={isAuthorized() ? <MainPage user={user}/> : <AuthPage onAuth={onAuthState}/>}> </Route>
                    <Route path={'/news'} element={isAuthorized() ? <NewsPage user={user}/> : <AuthPage onAuth={onAuthState}/>}> </Route>
                    <Route path={'/news/:id/*'} element={isAuthorized() ? <NewsDetailsComponent/> : <AuthPage onAuth={onAuthState}/>}> </Route>

                {/*<Route path={'/programs'} element={MainPage()}> </Route>
                <Route path={'/projects'} element={MainPage()}> </Route>
                <Route path={'/jurisprudence'} element={MainPage()}> </Route>
                <Route path={'/hcs'} element={MainPage()}> </Route>
                <Route path={'/ads'} element={MainPage()}> </Route>
                <Route path={'/employment'} element={MainPage()}> </Route>
                <Route path={'/private-services'} element={MainPage()}> </Route>*/}
                {/*<Route path={'/'} element={<MainPage user={user === null ? {} : user} onLogOut={logOut}/>}> </Route>
                    <Route path={'/auth'} element={<AuthPage onAuth={onAuthState}/>}> </Route>*/}
            </Routes>
            {/*<Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>
            <Col className={'main-area'}>
            </Col>
            <Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>*/}
        </Col>
  );
}

export default App;


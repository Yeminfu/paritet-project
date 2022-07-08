import React, {useState} from 'react';
import { useStore } from "effector-react";
import {Routes, Route} from 'react-router-dom';
import './App.scss';
import { Col } from 'antd';
import 'antd/dist/antd.min.css';
import MainPage from "./pages/MainPage";
import AuthPage from "./pages/AuthPage";
import {
    $authState,
    $userState,
    setAuthState,
    setUserState} from "./store/store";


const onSearch = (value: string) => console.log(value);

function App() {
    const [auth, setAuth] = useState(useStore($authState))
    const [user, setUser] = useState(useStore($userState))

    console.log(auth)
    console.log(user)
    if(user){

    }

    const onAuthState = (state: any, user?: any) => {
        console.log("onAuthState catched!!!", state, user)
        if(state){
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(user)
        }
        setAuth(state)
        setAuthState(state)
        localStorage.setItem('auth', state)
    }

    const logOut = () => {
        console.log("logOut catched!!!", user)
        setAuthState(null)
        setUserState(null)
        setAuth(null)
        setUser(null)
        localStorage.setItem('auth', 'null')
        localStorage.setItem('user', 'null')
    }

    return (
        <Col className="App">
            <Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>
            <Col className={'main-area'}>
                <Routes location={auth === null || auth === 'null' || user === null || user === 'null' ? '/auth' : '/'}>
                    <Route path={'/'} element={<MainPage user={user === null ? {} : user} onLogOut={logOut}/>}> </Route>
                    <Route path={'/auth'} element={<AuthPage onAuth={onAuthState}/>}> </Route>
                </Routes>
            </Col>
            <Col sm={1} md={2} lg={4} xl={4} xxl={4}> </Col>
        </Col>
  );
}

export default App;

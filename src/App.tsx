import React, {useState} from 'react';
import { useStore } from "effector-react";
import {Routes, Route, useNavigate} from 'react-router-dom';
import './App.scss';
import { Col } from 'antd';
import 'antd/dist/antd.min.css';
import {
    $authState, $token, $tokenExp, $username, $userId,
    //$userState,
    setAuthState, setTokenExpState, setTokenState, setUsernameState, setUserIdState,
    //setUserState
} from "./store/store";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailsComponent from "./components/NewsDetailsComponent";
import RegPage from "./pages/RegPage";
import ForumMessagesPage from "./pages/ForumMessagesPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import ForumCategoriesPage from "./pages/ForumCategoriesPage";
import ForumTopicsPage from "./pages/ForumTopicsPage";



function App() {
    const [auth, setAuth] = useState(useStore($authState))
    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(useStore($userId))
    const [username, setUsername] = useState(useStore($username))
    const [token, setToken] = useState(useStore($token))
    const [tokenExp, setTokenExp] = useState(useStore($tokenExp))

    let navigate = useNavigate();
    let isLogin = true

    //console.log("APP auth:", auth)
    //console.log("APP user:", username)
    //console.log("TOKEN:", new Date(user?.token_update) > new Date())

    const isAuthorized = () => {
        const currentDT = new Date()
        return !(auth === null || auth === 'null')
            && userId
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
            setUserIdState(user.id)
            setUsernameState(user.username)
            setTokenState(user.token)
            setTokenExpState(user.token_update.toString())
            setUserId(user.id)
            setUsername(user.username)
            setToken(user.token)
            setTokenExp(user.token_update.toString())
            setAuthState(state)

            localStorage.setItem('auth', state)
            localStorage.setItem('userId', user.id)
            localStorage.setItem('username', user.username)
            localStorage.setItem('token', user.token)
            localStorage.setItem('tokenExp', user.token_update.toString())
            user.username === "superuser"
                ? navigate("../admin/forums/categories", { replace: true })
                : navigate("../", { replace: true })
            return
        }
        setAuth(state)
        setAuthState(state)
        localStorage.setItem('auth', state)
        navigate("../login", { replace: true });
    }

    return (
        <Col className="App">
            <Routes>
                <Route path={'/registration'} element={<RegPage onReg={onAuthState}/>}> </Route>
                <Route path={'/login'} element={<AuthPage onAuth={onAuthState}/>}> </Route>

                <Route path={'/admin/forums/categories'} element={isAuthorized() ? <AdminCategoriesPage/> : <AuthPage onAuth={onAuthState}/>}> </Route>

                <Route path={'/'} element={isAuthorized() ? <MainPage user={user}/> : <AuthPage onAuth={onAuthState}/>}> </Route>

                <Route path={'/news'} element={isAuthorized() ? <NewsPage user={user}/> : <AuthPage onAuth={onAuthState}/>}> </Route>
                <Route path={'/news/:id/*'} element={isAuthorized() ? <NewsDetailsComponent/> : <AuthPage onAuth={onAuthState}/>}> </Route>

                <Route path={'/forum'} element={isAuthorized() ? <ForumCategoriesPage/> : <AuthPage onAuth={onAuthState}/>}> </Route>
                <Route path={'/forum/:id'} element={isAuthorized() ? <ForumTopicsPage/> : <AuthPage onAuth={onAuthState}/>}> </Route>
                <Route path={'/forum/:id/:id'} element={isAuthorized() ? <ForumMessagesPage/> : <AuthPage onAuth={onAuthState}/>}> </Route>

                {/*<Route path={'/programs'} element={MainPage()}> </Route>
                <Route path={'/projects'} element={MainPage()}> </Route>
                <Route path={'/jurisprudence'} element={MainPage()}> </Route>
                <Route path={'/hcs'} element={MainPage()}> </Route>
                <Route path={'/ads'} element={MainPage()}> </Route>
                <Route path={'/employment'} element={MainPage()}> </Route>
                <Route path={'/private-services'} element={MainPage()}> </Route>*/}
            </Routes>
            {isAuthorized() ? <div className={'clear-storage'} onClick={() => localStorage.clear()}>clear</div> : null}
        </Col>
  );
}

export default App;


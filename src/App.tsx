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
import Login from "./pages/Login";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import NewsDetailsComponent from "./components/NewsDetailsComponent";
import Registration from "./pages/Registration";
import ForumMessagesPage from "./pages/ForumMessagesPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import ForumCategoriesPage from "./pages/ForumCategoriesPage";
import ForumTopicsPage from "./pages/ForumTopicsPage";



function App() {


    return (
        <Col className="App">
            <Routes>
                <Route path='/registration' element={<Registration/>}/>
                <Route path='/login' element={<Login/>}/>

                <Route path='/admin/forums/categories' element={<AdminCategoriesPage/>}/>

                <Route path='/' element={<MainPage/>}/>

                <Route path='/news' element={<NewsPage/>}/>
                <Route path='/news/:id/*' element={<NewsDetailsComponent/>}/>

                <Route path='/forum' element={<ForumCategoriesPage/>}/>
                <Route path='/forum/:id' element={<ForumTopicsPage/>}/>
                <Route path='/forum/:id/:id' element={<ForumMessagesPage/>}/>
            </Routes>
        </Col>
  );
}

export default App;


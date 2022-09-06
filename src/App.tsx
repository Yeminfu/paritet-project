import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './App.scss';
import MainPage from "./pages/main/MainPage";
import {BrowserRouter} from 'react-router-dom';
import Login from "./pages/authorization/Login";
import NewsPage from "./pages/news/NewsPage";
import NewsDetailsComponent from "./components/news/NewsDetailsComponent";
import Registration from "./pages/authorization/Registration";
import ForumMessagesPage from "./pages/forum/ForumMessagesPage";
import AdminCategoriesPage from "./pages/admin/AdminCategoriesPage";
import ForumCategoriesPage from "./pages/forum/ForumCategoriesPage";
import ForumTopicsPage from "./pages/forum/ForumTopicsPage";
import DragNDropDesk from "./components/dragNdrop/DragNDropDesk";
import DragNDropList from "./components/dragNdrop/DragNDropList";
import DragNDropCard from "./components/dragNdrop/DragNDropCard";
import AdminNewsPage from "./pages/admin/AdminNewsPage";


export default function App(){

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/login' element={<Login/>}/>

                    <Route path='/admin/forums/categories' element={<AdminCategoriesPage/>}/>
                    <Route path='/admin/news' element={<AdminNewsPage/>}/>

                    <Route path='/' element={<MainPage/>}/>

                    <Route path='/news' element={<NewsPage/>}/>
                    <Route path='/news/:id/*' element={<NewsDetailsComponent/>}/>

                    <Route path='/forum' element={<ForumCategoriesPage/>}/>
                    <Route path='/forum/:id' element={<ForumTopicsPage/>}/>
                    <Route path='/forum/:id/:id' element={<ForumMessagesPage/>}/>

                    <Route path='/programs' element={<DragNDropDesk/>}/>
                </Routes>
            </BrowserRouter>
        </div>
  );
}


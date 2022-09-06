import React, {ReactNode, useEffect, useState} from "react";
import AdminCategorySettingsComponent from "../../components/admin/AdminCategorySettingsComponent";
import AdminCategoryObserver from "../../components/admin/AdminCategoryObserver";
import styles from './styles/AdminNewsPage.module.scss'
import {Link} from "react-router-dom";
import Fetcher from "../../Fetcher/Fetcher";
import {$newsCache, $newsCoords, setBreadCrumbs, setNewsCache} from "../../store/store";
import AdminNewsObserver from "../../components/admin/news/AdminNewsObserver";
import {NewsModel} from "../../lib/types";
import AdminNewsEditor from "../../components/admin/news/AdminNewsEditor";

interface Props{
    children?: ReactNode;
}

export default function AdminNewsPage({children}: Props){

    const [errorMsg, setErrorMsg] = useState('')
    const [news, setNews] = useState<null | NewsModel[]>(null)
    const [isLoaded, setIsLoaded] = useState(true)

    let fetcher = new Fetcher()

    useEffect(() => {
        setIsLoaded(true)
        async function loadNews(){
            const response = await fetcher.getNews(0)
            const data = response.data
            setNews(data)
            setNewsCache(data)
            setIsLoaded(false)
            console.log("NEWS SCROLL TO", $newsCoords.getState())
            setTimeout(() => {
                window.scrollTo(0, $newsCoords.getState())
                console.log("CHECK", $newsCoords.getState())
            }, 0)
        }
        if(!$newsCache.getState()){
            console.log("FROM BACK")
            loadNews();
        }
        else{
            console.log("FROM CACHE")
            setNews($newsCache.getState())
            setIsLoaded(false)
            console.log("NEWS SCROLL TO", $newsCoords.getState())
            setTimeout(() => {
                window.scrollTo(0, $newsCoords.getState())
                console.log("CHECK", $newsCoords.getState())
            }, 0)
        }
    }, []);

    return(
        <div className={styles.adminNewsPage}>
            <div className={styles.header}>
                <div className={styles.upperHeader}>
                    <Link to={'/'} className={styles.backButtonLink}>
                        <div className={styles.backButton}>{'❮'}</div>
                    </Link>
                    Форум/Категории
                </div>
                <div className={styles.lowerHeader}>
                    Новости
                </div>
            </div>
            <div className={styles.mainArea}>
                <div className={styles.adminArea}>
                    <AdminNewsEditor/>
                    {/*<AdminCategorySettingsComponent
                        onCategorySave={refreshCategories}
                        editingCategory={categoryForEdit}
                        parentId={currentCategoryId}
                        onCancelEdit={cancelEdit}
                        onError={showError}>
                    </AdminCategorySettingsComponent>*/}
                </div>
                <div className={styles.viewArea}>
                    <AdminNewsObserver
                        news={news}
                        onCategoryClicked={() => {}}
                        onGoToUpper={() => {}}
                        onEdit={() => {}}
                        onDelete={() => {}}/>
                </div>
            </div>
            <div className={styles.alertWrapper}>
                {
                    errorMsg.length > 0
                        ? <div className="alert alert-danger" role="alert">{errorMsg}</div>
                        : null
                }
            </div>
        </div>
    )
}
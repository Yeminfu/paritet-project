import React, {ReactNode, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './AdminNewsObserver.module.scss'
import iconEdit from '../../../assets/icons/IconEdit.svg'
import iconDelete from '../../../assets/icons/IconDelete.svg'
import {NewsModel} from "../../../lib/types";
import Utils from "../../../lib/utils";

interface Props{
    children?: ReactNode;
    news: null | NewsModel[];
    onCategoryClicked: any;
    onGoToUpper: any;
    onEdit: any;
    onDelete: any;
}

export default function AdminNewsObserver({children, news, onCategoryClicked, onGoToUpper, onEdit, onDelete}: Props){

    const utils = new Utils()

    return(
        <div className={styles.newsObserver}>
            <div className={styles.observerHeader}>Список новостей</div>
            <div className={styles.newsWrapper}>
                {
                    news?.map(function(news, index){
                        return <div className={styles.newsComponent} key={news.id}>
                            <div className={styles.newsContent}>
                                <div className={styles.newsHeader}>
                                    <div className={styles.newsDateTime}>
                                        {utils.formatDate(news.dateTime)}
                                    </div>
                                    <div className={styles.newsTitle}>
                                        {news.title}
                                    </div>
                                </div>
                                <div className={styles.newsBody}>
                                    <div className={styles.newsImg}>
                                        {news.content}
                                    </div>
                                    <div className={styles.newsDescription}>
                                        {news.description}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.handlers}>
                                <img className={styles.optionalButton}
                                     src={iconEdit}
                                     onClick={(event) => {
                                         event.preventDefault()
                                         event.stopPropagation()
                                         event.nativeEvent.stopImmediatePropagation()
                                         onEdit(news)
                                     }}
                                     alt={''}/>
                                <img className={styles.optionalButton}
                                     src={iconDelete}
                                     onClick={(event) => {
                                         event.preventDefault()
                                         event.stopPropagation()
                                         event.nativeEvent.stopImmediatePropagation()
                                         onDelete(news)
                                     }}
                                     alt={''}/>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
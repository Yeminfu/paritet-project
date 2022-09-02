import React, {ReactNode, useEffect, useState} from "react";
import styles from './styles/DragNDropList.module.scss'
import DragNDropCard from "./DragNDropCard";
import iconClose from '../../assets/icons/IconCloseGrey.svg'
import {DragDropContext, Droppable} from "react-beautiful-dnd";
import {useWhyDidYouUpdate} from "ahooks";

interface Props {
    children?: ReactNode;
    data: {id: number, title: string, cards: Array<CardModel>};
    onAdd: any;
    onHeaderChange: any;
    onCardEdited: any;
}
interface CardModel{
    id: number;
    title: string;
}


export default function DragNDropList({children, data, onAdd, onHeaderChange, onCardEdited}: Props){

    const [isNewCard, setIsNewCard] = useState(false)
    const [isHeaderEdit, setIsHeaderEdit] = useState(false)
    const [newCardText, setNewCardText] = useState('')
    const [headerText, setHeaderText] = useState('')


    useEffect(() => {
        if(!isNewCard){
            setNewCardText('')
        }
        if(!isHeaderEdit){
            setHeaderText('')
        }
    }, [isNewCard, isHeaderEdit])

    const onCreateCardSubmit = (event: any) => {
        event.preventDefault()
        onAdd(newCardText)
        setIsNewCard(false)
    }
    const onEditHeaderSubmit = (event: any) => {
        event.preventDefault()
        console.log("ADD1", headerText)
        onHeaderChange(headerText)
        setIsHeaderEdit(false)
    }
    const onCardEdit = (id: number, title: string) => {
        console.log("EDIT1")
        onCardEdited(id, title)
    }

    return(
         <div className={styles.list}>
             {
                 isHeaderEdit
                     ? <div className={styles.listHeaderInput}>
                         <form className={styles.inputForm}
                               onSubmit={onEditHeaderSubmit}>
                             <input className={styles.inputField}
                                    autoFocus
                                    onFocus={() => {setHeaderText(data.title)}}
                                    value={headerText}
                                    onChange={(event) => setHeaderText(event.target.value)}
                                    onBlur={() => setIsHeaderEdit(!isHeaderEdit)}/>
                         </form>
                         <img className={styles.inputCloser}
                              src={iconClose}
                              onClick={() => setIsHeaderEdit(!isHeaderEdit)}/>
                     </div>
                     : <div className={styles.listHeader}
                            onClick={() => setIsHeaderEdit(!isHeaderEdit)}>{data.title}</div>
             }
                 <Droppable droppableId={data.id.toString()}>
                     {provided => (
                         <div className={styles.container}
                              ref={provided.innerRef}
                              {...provided.droppableProps}>
                             {data.cards.map((e: CardModel, index: number) => {
                                 return <DragNDropCard data={e} index={index} onEdit={(id: number, title: string) => onCardEdit} key={e.id}/>
                             })}
                             {provided.placeholder}
                         </div>
                     )}
                 </Droppable>
             {
                 isNewCard
                     ? <div className={styles.listFooterInput}>
                         <form className={styles.inputForm}
                               onSubmit={onCreateCardSubmit}>
                             <input className={styles.inputField}
                                    autoFocus
                                    value={newCardText}
                                    onChange={(event) => setNewCardText(event.target.value)}
                                    onBlur={() => setIsNewCard(!isNewCard)}/>
                         </form>
                         <img className={styles.inputCloser}
                              src={iconClose}
                              onClick={() => setIsNewCard(!isNewCard)}/>
                     </div>
                     : <div className={styles.listFooter}
                            onClick={() => setIsNewCard(!isNewCard)}>
                         + Добавить карточку
                     </div>
             }
         </div>
    )
}
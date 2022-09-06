import React, {ReactNode, useCallback, useEffect, useState} from "react";
import styles from './styles/DragNDropDesk.module.scss'
import DefaultTmp from "../base/DefaultTmp";
import DragNDropList from "./DragNDropList";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";

interface Props {
    children?: ReactNode;
}
interface ColumnModel{
    id: number;
    title: string;
    cards: Array<CardModel>;
}
interface CardModel{
    id: number;
    title: string;
}

export default function DragNDropDesk({children}: Props){

    const [cardsCount, setCardsCount] = useState(0)
    const [columns, setColumns] = useState<Array<ColumnModel>>([
        {id: 1, title: "Задачи", cards: [
                {id: 0, title: "Card 0"},
                {id: 1, title: "Card 1"},
                {id: 2, title: "Card 2"},
                {id: 3, title: "Card 3"},
                {id: 4, title: "Card 4"},
                {id: 5, title: "Card 5"},
            ]},
        {id: 2, title: "В процессе", cards: [
                {id: 6, title: "Card 6"},
                {id: 7, title: "Card 7"},
                {id: 8, title: "Card 8"},
                {id: 9, title: "Card 9"},
                {id: 10, title: "Card 10"},
            ]},
        {id: 3, title: "Готово", cards: [
                {id: 11, title: "Card 11"},
            ]},
        {id: 4, title: "Невозможно выполнить", cards: [
                //{id: 9, title: "Card 9"},
            ]},
    ])

    useEffect(() => {
        //console.log("RENDER DESK")
        let count = 0
        columns.forEach(c => {count+=c.cards.length})
        setCardsCount(count)
    })

    const onAdd = (title: string, listId: number) => {
        let newList = columns
        newList.forEach(e => {
            if(e.id === listId){
                e.cards.push({id: cardsCount+2, title: title})
                setCardsCount(cardsCount+2)
            }
        })
        setColumns([...newList])
    }

    const onHeaderChange = (title: string, listId: number) => {
        let newList = columns
        newList.forEach(e => {
            if(e.id === listId){
                e.title = title
            }
        })
        console.log("list", newList)
        setColumns([...newList])
    }
    const onCardEdited = (id: number, title: string, listId: number) => {
        columns?.forEach(column => {
            column.cards.forEach(card => {
                if(card.id === id)
                    card.title = title
            })
        })
        console.log("EDIT", columns)
        setColumns(columns)
    }

    const onCardDragEnd = useCallback((result: DropResult) => {
        const {source, destination, draggableId} = result

        console.log("source", source)
        console.log("destination", destination)

        if(!destination) return

        if(destination.droppableId === source.droppableId
            && destination.index === source.index) return

        const actionColumn = columns.find(x => x.id === Number(source.droppableId))
        const receiveColumn = columns.find(x => x.id === Number(destination.droppableId))

        const droppedCard = actionColumn?.cards.find((x, index) => index === source.index)
        actionColumn?.cards.splice(source.index, 1)
        receiveColumn?.cards.splice(destination.index, 0, droppedCard as CardModel)

        setColumns([...columns])
    }, [])

    return(
        <DefaultTmp>
            <DragDropContext onDragEnd={result => onCardDragEnd(result)}>
            <div className={styles.desk}>
                {
                    columns.map(e => {
                        return <DragNDropList
                            data={e}
                            key={e.id}
                            onAdd={(title: string) => onAdd(title, e.id)}
                            onCardEdited={(id: number, title: string) => onCardEdited(id, title, e.id)}
                            onHeaderChange={(title: string) => {console.log("ADD1.5"); onHeaderChange(title, e.id)}}/>
                    })
                }
            </div>
            </DragDropContext>
        </DefaultTmp>
    )
}
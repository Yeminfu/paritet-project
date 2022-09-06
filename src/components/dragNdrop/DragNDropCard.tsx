import React, {ReactNode, useEffect, useState} from "react";
import styles from "./styles/DragNDropCard.module.scss";
import {Draggable} from "react-beautiful-dnd";
import iconClose from "../../assets/icons/IconCloseGrey.svg";

interface Props {
    children?: ReactNode;
    data: any;
    index: number;
    onEdit: any;
}

export default function DragNDropCard({children, data, index, onEdit}: Props){

    const [isCardEdit, setIsCardEdit] = useState(false)
    const [cardText, setCardText] = useState(data.title)

    useEffect(() => {
        //console.log("RENDER_CARD", data)
    })
    //const [{ isDragging }, drag] = useDrag(
    //    () => ({
    //        type: ItemTypes.CARD,
    //        item: { id: data.id, title: data.title },
    //        collect: (monitor) => ({
    //            isDragging: !!monitor.isDragging() ? 0.8 : 1
    //        })
    //    }),
    //    []
    //)
    //const [{ isOver, canDrop }, drop] = useDrop(() => ({
    //    accept: ItemTypes.CARD,
    //    drop: (obj, monitor) => {
    //        console.log(obj)
    //        console.log(monitor)
    //    },
    //    collect: monitor => ({
    //        isOver: !!monitor.isOver(),
    //        canDrop: !!monitor.canDrop()
    //    }),
    //}), [])
    //const getDrop = function(x: number, y: number){
    //
    //}

    const onEditCardSubmit = (event: any) => {
        console.log("EDIT0")
        event.preventDefault()
        onEdit(data.id, cardText)
        setCardText(cardText)
        setIsCardEdit(false)
    }

    return(
        <Draggable draggableId={data.id.toString()} index={index}>
            {provided => (
                <div className={styles.card}
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}>
                    {
                        isCardEdit
                            ? <div className={styles.cardInput}>
                                <form className={styles.inputForm}
                                      onSubmit={onEditCardSubmit}>
                                    <input className={styles.inputField}
                                           autoFocus
                                           value={cardText}
                                           onChange={(event) => setCardText(event.target.value)}
                                           onBlur={() => setIsCardEdit(!isCardEdit)}/>
                                </form>
                                <img className={styles.inputCloser}
                                     src={iconClose}
                                     onClick={() => setIsCardEdit(!isCardEdit)}/>
                            </div>
                            : <div className={styles.cardHeader}
                                   onClick={() => setIsCardEdit(!isCardEdit)}>{data.title}</div>
                    }
                </div>
            )}
        </Draggable>
    )
}
import React, {ReactNode, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewMessageModalComponent.scss'


interface Props{
    children?: ReactNode;
    title?: string;
    placeholder?: string;
    onClose: any;
    onAccept: any;
    initialMsg: string;
    msgID: number | null;
}

const onSearch = (value: string) => console.log(value)

export default function NewMessageModalComponent(
    {children, title = 'title', placeholder = 'placeholder', onClose, onAccept, initialMsg, msgID}: Props){

    const[messages, setMessages] = useState([])
    const[currentMsg, setCurrentMsg] = useState(initialMsg)


    useEffect(() => {
        const input = document.getElementById('text-input')
        if(input) input.innerHTML = initialMsg
        input?.addEventListener('input', (event) => {
            const element = event.currentTarget as HTMLInputElement
            const value = element.value
            console.log("TEXT:", value);
            setCurrentMsg(value)
        })
    })


    const onAccepted = () => {
        console.log("onAccepted", currentMsg, msgID)
        msgID
            ? onAccept(currentMsg, msgID)
            : onAccept(currentMsg)
    }
    const onClosed = (e: any) => {
        console.log("onClosed", e.target)
        onClose()
    }

    return(
        <div className="modal" tabIndex={-1}
             onClick={(e) => {onClosed(e)}} style={{maxWidth: '100%'}}>
            <div className='container'>
                <div className="modal-dialog" onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation();
                    e.nativeEvent.stopImmediatePropagation();
                }}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={(e) => {onClosed(e)}}> </button>
                        </div>
                        <div className="modal-body">
                            <textarea className="form-control" id={'text-input'} placeholder={placeholder} onClick={() => {}}/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={(e) => {onClosed(e)}}>Отмена</button>
                            <button type="submit" className="btn btn-primary" onClick={onAccepted}>Отправить</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
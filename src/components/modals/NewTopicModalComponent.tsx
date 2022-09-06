import React, {ReactNode, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewTopicModalComponent.scss'


interface Props{
    children?: ReactNode;
    user: any;
    title?: string;
    firstPlaceholder?: string;
    secondPlaceholder?: string;
    onClose: any;
    onAccept: any;
    initialMsg: string;
    msgID?: number | null;
}

const onSearch = (value: string) => console.log(value)

export default function NewTopicModalComponent({
                                                   children,
                                                   user,
                                                   title = 'title',
                                                   firstPlaceholder = 'placeholder1',
                                                   secondPlaceholder = 'placeholder2',
                                                   onClose,
                                                   onAccept,
                                                   initialMsg,
                                                   msgID}: Props){

    const[currentTitle, setCurrentTitle] = useState(initialMsg)
    const[currentMsg, setCurrentMsg] = useState(initialMsg)


    useEffect(() => {
        const inputTitle = document.getElementById('input-title')
        const inputMsg = document.getElementById('input-msg')
        //if(inputTitle) inputTitle.innerHTML = initialMsg
        inputTitle?.addEventListener('input', (event) => {
            const element = event.currentTarget as HTMLInputElement
            const value = element.value
            //console.log("TEXT:", value)
            setCurrentTitle(value)
        })
        inputMsg?.addEventListener('input', (event) => {
            const element = event.currentTarget as HTMLInputElement
            const value = element.value
            //console.log("TEXT:", value)
            setCurrentMsg(value)
        })
    })


    const onAccepted = () => {
        console.log("onAccepted", currentMsg)
        onAccept(currentTitle, currentMsg)
        //msgID
        //    ? onAccept(currentMsg, msgID)
        //    : onAccept(currentMsg)
    }
    const onClosed = (e: any) => {
        console.log("onClosed", e.target)
        onClose()
    }

    return(
        <div className="modal" tabIndex={-1}
             style={{maxWidth: '100%'}}
             onClick={(e) => {onClosed(e)}}>
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
                            <div className={'title'}>
                                <input type="text" className="form-control" id={'input-title'} placeholder={firstPlaceholder} onClick={() => {}}/>
                            </div>
                            <div className={'msg'}>
                                <textarea className="form-control" id={'input-msg'} placeholder={secondPlaceholder} onClick={() => {}}/>
                            </div>
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
import './FloatButtonComponent.scss';
import React, {ReactNode} from 'react'

interface Props {
    children?: [ReactNode];
    clicked: any;
    color: string;
    icon: any;
    title: string;
}

export default function FloatButtonComponent({clicked, color, icon, title}: Props){

    return(
        <div className={'float-button'} onClick={clicked} style={{backgroundColor: color}} title={title}>
            <img src={icon} alt={title}/>
        </div>
    )
}
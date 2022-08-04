import './FloatButtonComponent.scss';
import React, {ReactNode} from 'react'

interface Props {
    children?: [ReactNode];
    clicked: any;
    color: string;
    icon: string;
    title: string;
}

export default function FloatButtonComponent({clicked, color, icon, title}: Props){

    const onButtonClicked = () => {clicked()}

    return(
        <div className={'float-button'} onClick={clicked} style={{backgroundColor: color}} title={title}>
            <img src={process.env.PUBLIC_URL + icon} alt={title}/>
        </div>
    )
}
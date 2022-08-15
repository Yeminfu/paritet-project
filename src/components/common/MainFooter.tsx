import React, {ReactNode} from "react";
import './MainFooter.scss';

interface Props {
    children?: [ReactNode];
}

export default function MainFooter({children}: Props){

    return(
        <div className={'main-footer'} id='main-footer'>
            Контактные данные 89241237687
        </div>
    )
}
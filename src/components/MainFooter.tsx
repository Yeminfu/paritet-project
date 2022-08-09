import React, {ReactNode, useEffect} from "react";
import './MainFooter.scss';

interface Props {
    children?: [ReactNode];
}

export default function MainFooter({children}: Props){

    //useEffect(() => {
    //    //console.log("CLD", children)
    //    const el = document.getElementById('main-footer')
    //    console.log("EL", el)
    //    if(el){
    //        children && children?.length < 2 ? el.style.position = 'static' : el.style.position = 'static'
    //        children && children?.length < 2 ? el.style.bottom = 'none' : el.style.bottom = '0'
    //    }
    //}, [])

    return(
        <div className={'main-footer'} id='main-footer'>
            Контактные данные 89241237687
        </div>
    )
}
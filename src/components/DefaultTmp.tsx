import MainHeader from "./MainHeader";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './DefaultTmp.scss'

interface Props{
    children: any;
}

export default ( {children}: Props ) => {
    return (
        <div className={'container'}>
            <MainHeader>

            </MainHeader>
            <div className={'page-content'}>
                {children}
            </div>
        </div>
    )
}
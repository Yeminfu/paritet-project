import MainHeader from "./MainHeader";
import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './DefaultTmp.scss'

interface Props{
    children: any;
}

export default ( {children}: Props ) => {
    return (
        <>
            <MainHeader>

            </MainHeader>
            <div className={'container'}>
                {children}
            </div>
        </>
    )
}
import MainHeader from "../common/MainHeader";
import React, {useEffect, useLayoutEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './DefaultTmp.scss'
import MainFooter from "../common/MainFooter";
import {$mainCoords, setMainCoords} from "../../store/store";

interface Props{
    children: any;
    getScroll?: any;
}

export default ( {children,getScroll}: Props ) => {

    useLayoutEffect(() => {

        return () => {
            if(getScroll) getScroll(window.scrollY);
        }
    }, [])

    return (
    <React.Fragment>
        <div className='header-content-container'>
            <MainHeader>

            </MainHeader>
        </div>
        <div className='container'>
            <div className='default-tmp-wrapper'>
                <div className='container'
                     style={{display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between'}}>
                    <div className='content-container'>
                        {children}
                    </div>
                    <div className='footer-content-container'>
                        <MainFooter>
                            {children}
                        </MainFooter>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    )
}
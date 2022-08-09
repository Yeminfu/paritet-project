import MainHeader from "./MainHeader";
import React, {useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './DefaultTmp.scss'
import MainFooter from "./MainFooter";

interface Props{
    children: any;
}

export default ( {children}: Props ) => {

    return (
        <div className='container'>
            <div className='default-tmp-wrapper'>
                <div className='header-content-container'>
                    <MainHeader>

                    </MainHeader>
                </div>
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
    )
}
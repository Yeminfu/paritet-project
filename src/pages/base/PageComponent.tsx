import React, {ReactNode} from "react";
import './PageComponent.scss';
import Fetcher from "../../Fetcher/Fetcher";
import {Link, Navigate, Route, useNavigate} from "react-router-dom";

interface Props{
    children?: [ReactNode];
    floatButton?: JSX.Element | null;
    modal?: JSX.Element | null;
    isWrap?: boolean;
}

const onSearch = (value: string) => console.log(value);

export default function PageComponent({children, floatButton, modal, isWrap = true}: Props){


    let fetcher = new Fetcher()
    let navigate = useNavigate()
    //console.log(auth)
    //console.log(user)

    const logOut = async () => {
        console.log("LOGOUT")
        localStorage.setItem('auth', 'null')
        localStorage.setItem('username', 'null')

        return <Route
            path={'/login'}
            element={ <Navigate to='/login'/>} >
        </Route>
    }

    function getList(){
        //console.log("GETHCLD", children)
        return children?.map(e => e)
    }

    return(
        <div className={'page'}>
            <div> </div>
            <div className={'content-area'}>
                <div className={'main-header'}>
                    <div className={'upper-header'}>
                        <div className={'user-name-label'}>{}</div>
                        <div className={'exit-button-wrapper'}>

                        </div>
                    </div>
                    <div className={'lower-header'}>
                        <div className={'logo-wrapper'} onClick={() => {navigate("../", { replace: true });}}>Паритет</div>
                    </div>
                </div>
                <div className={'main-content'}>
                    <div className={'modules-area'} style={{'flexFlow': isWrap ? 'wrap' : 'none'}}>
                        {getList()}
                    </div>
                    <div className={'main-footer'}
                         style={{
                             position: children && (children.length < 2) ? 'static' : 'absolute',
                             bottom: children && (children.length < 2) ? 'none' : '0',
                         }}>Контактные данные 89241237687</div>
                </div>
                { floatButton }
            </div>
            <div> </div>
            { modal }
        </div>
    )
}
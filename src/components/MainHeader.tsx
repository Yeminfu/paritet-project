import React, {ReactNode} from "react";
import {Link, useNavigate} from "react-router-dom";
import './MainHeader.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderAuthButton from "./HeaderAuthButton/HeaderAuthButton";

interface Props{
    children?: ReactNode;
}

export default function MainHeader({children}: Props){

    const navigate = useNavigate()

    return(
            <div className={'main-header'}>
                <div className='container'>
                    <div className={'upper-header'}>
                        <div className={'user-name-label'}>{}</div>
                        <div className={'exit-button-wrapper'}>
                            <Link to={'/login'}>
                                <HeaderAuthButton/>
                            </Link>
                        </div>
                    </div>
                    <div className={'lower-header'}>
                        <div className={'logo-wrapper'} onClick={() => {navigate("../", { replace: true });}}>Паритет</div>
                    </div>
                </div>
            </div>
    )
}
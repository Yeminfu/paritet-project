import React, {ReactNode} from "react";
import {Link, useNavigate} from "react-router-dom";
import './MainHeader.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderAuthButton from "./HeaderAuthButton/HeaderAuthButton";
import {$auth} from "../store/store";

interface Props{
    children?: ReactNode;
}

export default function MainHeader({children}: Props){

    const navigate = useNavigate()

    return(
            <div className={'main-header'}>
                <div className='container'>
                    <div className={'upper-header'}>
                        <div className={'logo-wrapper'} onClick={() => {navigate("../", { replace: true });}}>Паритет</div>
                        <div className={'exit-button-wrapper'}>
                            <div className={'user-name-label'}>{$auth.getState()?.user.username}</div>
                            <Link to={'/login'}>
                                <HeaderAuthButton/>
                            </Link>
                        </div>
                    </div>
                    <div className={'lower-header'}>

                    </div>
                </div>
            </div>
    )
}
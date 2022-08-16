import React, {ReactNode} from "react";
import {Link, useNavigate} from "react-router-dom";
import './MainHeader.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import HeaderAuthButton from "../buttons/HeaderAuthButton";
import {$auth, $breadCrumbs} from "../../store/store";
import { useList } from "effector-react";
import BreadCrumbs from "./BreadCrumbs";

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
                            <div className={'user-name-label'}>{$auth.getState()?.user.username || localStorage.getItem('username')}</div>
                            <Link to={'/login'}>
                                <HeaderAuthButton/>
                            </Link>
                        </div>
                    </div>
                    <div className={'lower-header'}>
                        <BreadCrumbs/>
                        {/*{
                            useList($breadCrumbs, (e: {crumb: string}, i: number) => (
                                <div>{e.crumb}</div>
                            ))
                        }*/}
                    </div>
                </div>
            </div>
    )
}
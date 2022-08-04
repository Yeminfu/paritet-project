import React, {ReactNode} from "react";
import {Link, useNavigate} from "react-router-dom";
import './MainHeader.scss'

interface Props{
    children?: ReactNode;
}

export default function MainHeader({children}: Props){

    const navigate = useNavigate()

    return(
        <div className={'main-header'}>
            <div className={'upper-header'}>
                <div className={'user-name-label'}>{}</div>
                <div className={'exit-button-wrapper'}>
                    <Link to={'/login'}>
                        <button className={'button'}
                                type="submit"
                                onClick={() => {}}>Выйти</button>
                    </Link>
                </div>
            </div>
            <div className={'lower-header'}>
                <div className={'logo-wrapper'} onClick={() => {navigate("../", { replace: true });}}>Паритет</div>
            </div>
        </div>
    )
}
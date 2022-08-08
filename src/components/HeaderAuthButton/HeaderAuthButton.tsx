import React, {ReactNode, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {$auth, logout} from "../../store/store";
import {useNavigate} from "react-router-dom";

interface Props{
    children?: ReactNode;
}

export default function HeaderAuthButton({children}: Props){

    const navigate = useNavigate()


    const onClicked = () => {
        console.log("LOG", $auth)
        console.log("LOG", $auth.getState())
        if(!$auth.getState()){
            logout()
        }
        navigate('../login')
    }

    return(
        <div onClick={onClicked}>
            {
                $auth.getState()
                    ? <button type="button" className="btn btn-danger">Выйти</button>
                    : <button type="button" className="btn btn-primary">Войти</button>
            }
        </div>
    )
}
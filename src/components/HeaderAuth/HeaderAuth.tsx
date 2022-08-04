import React, {ReactNode, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {$auth, logout} from "../../store/store";
import {useNavigate} from "react-router-dom";

interface Props{
    children?: ReactNode;
}

export default function HeaderAuth({children}: Props){

    const navigate = useNavigate()

    const [isAuth, setIsAuth] = useState($auth)

    const onClicked = () => {
        if(!isAuth){
            logout()
        }
        navigate('../login')
    }

    return(
        <div onClick={onClicked}>
            {
                isAuth
                    ? <button type="button" className="btn btn-primary">Войти</button>
                    : <button type="button" className="btn btn-danger">Выйти</button>
            }
        </div>
    )
}
import React, {ReactNode} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {$auth, logout} from "../../store/store";
import {Link, useNavigate} from "react-router-dom";

interface Props{
    children?: ReactNode;
}

export default function HeaderAuthButton({children}: Props){

    const navigate = useNavigate()

    let id = localStorage.getItem('id')
    let username = localStorage.getItem('username')
    let token = localStorage.getItem('token')




    const onClicked = () => {
        console.log("LOG", $auth)
        console.log("LOG", $auth.getState())
        if(!$auth.getState()){
            logout()
        }
        navigate('../login',{replace: true})
    }

    return(
        <Link to={'/login'}>
            <div>
                {
                    id && username && token && id?.length > 0 && token?.length > 0 && username?.length > 0
                        ? <button type="button" className="btn btn-danger">Выйти</button>
                        : <button type="button" className="btn btn-primary">Войти</button>
                }
            </div>
        </Link>
    )
}
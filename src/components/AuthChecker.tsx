import React, {useEffect} from "react";
import {$auth} from "../store/store";
import {useNavigate} from "react-router-dom";
import Login from "../pages/Login";

interface Props{
    children: any;
}

export default function AuthChecker({children}: Props){

    const navigator = useNavigate()
    useEffect(() => {
        console.log("MP", $auth.getState())
        console.log("MP", children)
    }, [])

    const checkIsAuth = function(){
        if($auth.getState())
            return children
        else {
            navigator('../login')
            return <Login> </Login>
        }
    }

    return(
        <>
            {
                checkIsAuth()
            }
        </>


    )
}
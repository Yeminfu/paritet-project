import React, {useEffect} from "react";
import {$auth} from "../store/store";
import {useNavigate} from "react-router-dom";
import Login from "../pages/Login";
import {useStore} from "effector-react";

interface Props{
    children: any;
}

export default function AuthChecker({children}: Props){

    const auth = useStore<null|any>($auth)

    const navigator = useNavigate()
    useEffect(() => {
        console.log("MP", $auth)
        console.log("MP", children)
    }, [])

    const checkIsAuth = function(){
        const a = $auth
        console.log("a1", auth)
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
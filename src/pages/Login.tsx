import React, {ReactNode, useEffect, useState} from 'react'
import './MainPage/MainPage.scss'
import { Form, Field } from 'react-final-form'
import './Login.scss'
import Fetcher from "../Fetcher/Fetcher";
import {useLocation, useNavigate} from "react-router-dom";

interface Props{
    children?: ReactNode;
    onAuth: any;
}

export default function Login({children, onAuth}: Props){

    let location = useLocation()
    let navigate = useNavigate();


    useEffect(() => {
        if(location.pathname !== '/login') {
            navigate('../login', { replace: true })
        }
    }, [])


    let auth = false;

    const controller = new Fetcher;

    const [userNameError, setUserNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [isRegistration, setIsRegistration] = useState(false)

    async function checkInputData(username: string, password: string, limits: [number, number]){
        console.log("Auth: username:", username)
        console.log("Auth: password:", password)
        if(!username ||username.length === 0){
            console.log('username is empty')
            setUserNameError('Пустое поле')
            setPasswordError('')
            return
        }
        if(username.length < limits[0] || username.length > limits[1]){
            console.log('username should be from 6 till 20 symbols')
            setUserNameError('Имя должно быть от 6 до 20 символов')
            setPasswordError('')
            return
        }
        if(!password ||password.length === 0){
            console.log('password is empty')
            setUserNameError('')
            setPasswordError('Пустое поле')
            return
        }
        if(password.length < limits[0] || password.length > limits[1]){
            console.log('password should be from 6 till 20 symbols')
            setUserNameError('')
            setPasswordError('Пароль должен быть от 6 до 20 символов')
            return
        }
        else{
            setUserNameError('')
            setPasswordError('')
            let answer = await controller.getAuth(username, password)
            console.log('answer', answer)

            if(answer?.id && answer?.username && answer?.token && answer?.token_update){
                auth = true;
                onAuth(auth, answer)
            }
            else if(answer === null){
                setUserNameError(``)
                setPasswordError('Неверный логин или пароль')
            }
            else if(answer === undefined){
                setUserNameError('')
                setPasswordError('Ошибка сервера')
            }

            //if(answer === 'unkuser'){
            //    setUserNameError(`Пользователя "${username}" не существует`)
            //    setPasswordError('')
            //}
            //else if(answer === 'wrongpass'){
            //    setUserNameError('')
            //    setPasswordError('Неверный пароль')
            //}
            //else if(answer?.username === username && answer?.password === password){
            //    auth = true;
            //    onAuth(auth, answer)
            //}
            //else{
            //    setUserNameError('')
            //    setPasswordError('Ошибка сервера')
            //}
        }
        //else await controller.getAccountInfo(username, password)
    }

    const onSubmit = async (e: any) => {
        await checkInputData(e.username, e.password, [6,20])
    }

    //async function a(){
    //    const fetcher = new Fetcher()
    //    await fetcher.getAuth('user_12', '111111')
    //}


    return(
        <div className={'auth-page'}>
                <Form
                    onSubmit={onSubmit}
                    render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className={'auth-container'}>
                            <h2>{isRegistration ? 'Регистрация' : 'Авторизация'}</h2>
                            <div className={'input-container'}>
                                <label>Логин</label>
                                <Field className={'input1'}
                                       name="username"
                                       component="input"
                                       placeholder=""
                                       autoComplete={'on'} />
                                <div className={'error'}>{userNameError}</div>
                            </div>
                            <div className={'input-container'}>
                                <label>Пароль</label>
                                <Field className={'input1'}
                                       name="password"
                                       component="input"
                                       placeholder=""
                                       type={'password'}
                                       autoComplete={'on'}/>
                                 <div className={'error'}>{passwordError}</div>
                            </div>
                            <a className={'to-registration-link'} onClick={() => { navigate('../registration', { replace: true })}}>Зарегистрироваться</a>
                            <div className={'submit-button-container'}>
                                <button type="submit" className={'button'}>Войти</button>
                            </div>
                        </form>
                    )}
                />
        </div>
    )
}
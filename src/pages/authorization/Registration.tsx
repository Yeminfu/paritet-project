import React, {ReactNode, useState} from 'react'
import { Form, Field } from 'react-final-form'
import './Registration.scss'
import Fetcher from "../../Fetcher/Fetcher";
import {useLocation, useNavigate} from "react-router-dom";
import {$auth, setAuth} from "../../store/store";

interface Props{
    children?: ReactNode;
}

export default function Registration({children}: Props){

    let location = useLocation()
    let navigate = useNavigate();


    let auth = false;

    const controller = new Fetcher;

    const [userNameError, setUserNameError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    async function checkInputData(username: string, password: string, limits: [number, number]){
        console.log("Reg: username:", username)
        console.log("Reg: password:", password)
        if(!username || username.length === 0){
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
        else {
            setUserNameError('')
            setPasswordError('')
            let answer = await controller.getRegistration(username, password)
            console.log('answer', answer)

        if (answer?.id && answer?.username && answer?.token) {
            auth = true;
            const authData = {
                token: answer.token,
                user: {
                    id: answer.id,
                    username: answer.username,
                }
            }
            console.log("BEFORE LOGIN", $auth.getState())
            setAuth(authData)
            console.log("AFTER LOGIN", $auth.getState())
            localStorage.setItem('id', authData.user.id)
            localStorage.setItem('username', authData.user.username)
            localStorage.setItem('token', authData.token)
            navigate('../',{replace: true})
        }
        else if (answer === null) {
                setUserNameError(``)
                setPasswordError(`Имя "${username}" занято`)
            }
        else if (answer === 0) {
                setUserNameError(``)
                setPasswordError(`Пользователь не создан`)
            }
        else if (answer === undefined) {
                setUserNameError('')
                setPasswordError('Ошибка сервера')
            }
        }
    }

    const onSubmit = async (e: any) => {
        await checkInputData(e.username, e.password, [6,20])
    }


    return(
        <div className={'reg-page'}>
            <Form
                onSubmit={onSubmit}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={'auth-container'}>
                        <h2>{'Регистрация'}</h2>
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
                        <a className={'to-login-link'} onClick={() => { navigate('../login', { replace: true })}}>Войти</a>
                        <div className={'submit-button-container'}>
                            <button type="submit" className={'button'}>Зарегистрироваться</button>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}
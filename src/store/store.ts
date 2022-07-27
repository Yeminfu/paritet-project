import { createEvent, createStore } from 'effector'

//localStorage.clear()

export const setAuthState = createEvent<void | null>('setAuthState')
export const $authState = createStore(localStorage.getItem('auth'))
    .on(setAuthState, (o: any, n: void | null) => n)

//export const setUserState = createEvent<string | null>('setUserState')
//export const $userState = createStore(localStorage.getItem('user'))

//export const setUserState = createEvent<{ id: number, username: string, token: string, token_update: Date } | null>();
//export const $userState = createStore<{id: number, username: string, token: string, token_update: Date} | null>(null)
//    .on(setUserState, (_, obj) => obj)

//$object.on(objectReceived, (_, object) => object)
export const setUsernameState = createEvent<string | null>();
export const setTokenState = createEvent<string | null>();
export const setTokenExpState = createEvent<string | null>();

export const $username = createStore(localStorage.getItem('username'))
    .on(setUsernameState, (o: any, n: string | null) => n)
export const $token = createStore(localStorage.getItem('token'))
    .on(setTokenState, (o: any, n: string | null) => n)
export const $tokenExp = createStore(localStorage.getItem('tokenExp'))
    .on(setTokenExpState, (o: any, n: string | null) => n)
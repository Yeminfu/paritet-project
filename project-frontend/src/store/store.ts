import { createEvent, createStore } from 'effector'

//localStorage.clear()

export const setAuthState = createEvent<void | null>('setAuthState')
export const $authState = createStore(localStorage.getItem('auth'))
    .on(setAuthState, (o: any, n: void | null) => n)

export const setUserState = createEvent<string | null>('setUserState')
export const $userState = createStore(localStorage.getItem('user'))
    .on(setUserState, (o: any, n: string | null) => n)



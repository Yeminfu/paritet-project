import { createEvent, createStore } from 'effector'

//localStorage.clear()

export const setAuthState = createEvent<void | null>('setAuthState')
export const $authState = createStore(localStorage.getItem('auth'))
    .on(setAuthState, (o: any, n: void | null) => n)

export const setAdminSettingsCategoryCurrentIdState = createEvent<string | null>('setAdminSettingsCategoryCurrentIdState')
export const $adminSettingsCategoryCurrentId = createStore(localStorage.getItem('adminSettingsCategoryCurrentId'))
    .on(setAdminSettingsCategoryCurrentIdState, (o: any, n: string | null) => n)

//export const setUserState = createEvent<string | null>('setUserState')
//export const $userState = createStore(localStorage.getItem('user'))

//export const setUserState = createEvent<{ id: number, username: string, token: string, token_update: Date } | null>();
//export const $userState = createStore<{id: number, username: string, token: string, token_update: Date} | null>(null)
//    .on(setUserState, (_, obj) => obj)

//$object.on(objectReceived, (_, object) => object)

//USER STATES
export const setUserIdState = createEvent<string | null>();
export const setUsernameState = createEvent<string | null>();
export const setTokenState = createEvent<string | null>();
export const setTokenExpState = createEvent<string | null>();

export const $userId = createStore(localStorage.getItem('userId'))
    .on(setUserIdState, (o: any, n: string | null) => n)
export const $username = createStore(localStorage.getItem('username'))
    .on(setUsernameState, (o: any, n: string | null) => n)
export const $token = createStore(localStorage.getItem('token'))
    .on(setTokenState, (o: any, n: string | null) => n)
export const $tokenExp = createStore(localStorage.getItem('tokenExp'))
    .on(setTokenExpState, (o: any, n: string | null) => n)




//FORUM CATEGORIES STATES
export const setCurrentForumCategory = createEvent<string | null>();
export const $currentForumCategory = createStore(localStorage.getItem('currentForumCategory'))
    .on(setCurrentForumCategory, (o: any, n: string | null) => n)

//FORUM TOPICS STATES
export const setCurrentForumTopic = createEvent<string | null>();
export const $currentForumTopic = createStore(localStorage.getItem('currentForumTopic'))
    .on(setCurrentForumTopic, (o: any, n: string | null) => n)









